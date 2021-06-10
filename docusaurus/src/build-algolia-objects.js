const fs = require('fs');
const mdx = require('@mdx-js/mdx');
const admonitions = require('remark-admonitions');
const {
  parseFrontMatter,
  parseMarkdownContentTitle,
} = require('@docusaurus/utils');
const { platformMapping, IGNORED_DIRECTORIES } = require('../constants');

const extractSyntaxTree = (path) => {
  // This function takes care of transforming the .md/.mdx file into an
  // array of nodes which contains the type and data about that node
  // in the markdown file. Also, it categorizes everything so we can
  // later remove the js/react code used on .mdx files
  // Note: It wont remove code samples, only actual code used to
  // render react components inside the markdown
  return new Promise((res) => {
    var doc = fs.readFileSync(path, 'utf8');

    const { content: contentWithTitle } = parseFrontMatter(doc);

    const { content } = parseMarkdownContentTitle(contentWithTitle);

    mdx.sync(content, {
      skipExport: true,
      remarkPlugins: [
        admonitions,
        () => (ast) => {
          res(ast);
          return ast;
        },
      ],
    });
  });
};

const mergeChildTree = (curr, childrenItem) => {
  Object.values(childrenItem).forEach((childrenData) => {
    if (!curr[childrenData.headerId]) {
      curr[childrenData.headerId] = {
        headerId: childrenData.headerId,
        text: [],
        code: [],
      };
    }
    curr[childrenData.headerId].text.push(childrenData.text.join(' '));
    curr[childrenData.headerId].code.push(...childrenData.code);
  });

  return curr;
};

const parseMdxData = (
  path,
  toString,
  syntaxTree,
  lastHeaderIdParam,
  mdxImportedComponentsParam
) => {
  let lastHeaderId = undefined;
  let mdxImportedComponents = mdxImportedComponentsParam || {};
  const initialReduceValue = {};
  // When calling this function recursively we will receive the
  // "lastHeaderIdParam" param and it means we need to
  // pre-initialize things
  if (lastHeaderIdParam) {
    lastHeaderId = lastHeaderIdParam;
    initialReduceValue[lastHeaderId] = {
      headerId: lastHeaderId,
      text: [],
      code: [],
    };
  }

  // This reduce functions basically iterate through the markdown
  // nodes and pick only paragraphs and code, categorizing them
  // by header id. This will allow us to later have search results
  // that leads us to specific page headers in the docs
  return syntaxTree.children.reduce(async (currP, item) => {
    let curr = await currP;

    // If import, we get every mdx imported component and save it on a map
    if (item.type === 'import') {
      const imports = item.value.split('\n').filter((item) => {
        const extension = item.split('.').pop();
        return extension.includes('mdx');
      });
      // [import Component from path] should become {[Component]: path}
      // This is safe because mdx imports have to use default
      imports.forEach((item) => {
        const [, importComponent, _, path] = item.split(' ');
        mdxImportedComponents = {
          ...mdxImportedComponents,
          [importComponent]: path.replace(/('|;|")/gi, ''),
        };
      });

      return curr;
    }

    // If heading, we initialize the heading object and set it
    // as lastHeaderId so next items in the tree can use it as
    // key
    if (item.type === 'heading') {
      if (
        curr[lastHeaderId] &&
        curr[lastHeaderId].text.length === 0 &&
        curr[lastHeaderId].code.length === 0
      ) {
        // cleanup empty items from last iteration
        delete curr[lastHeaderId];
      }
      lastHeaderId = toString(item).replace(/\s/g, '-');
      curr[lastHeaderId] = { headerId: lastHeaderId, text: [], code: [] };
    }

    // If there is no heading id yet, it means that this page has some description
    // text before starting the headers. We need to create a specific page key in order to
    // put the text/code available in that page.
    if (!curr[lastHeaderId]) {
      const pageItem = await parseMdxData(
        path,
        toString,
        { children: [item] },
        'page',
        mdxImportedComponents
      );

      if (!curr.page) {
        curr.page = {
          text: [],
          code: [],
        };
      }

      curr.page.text.push(...pageItem.page.text);
      curr.page.code.push(...pageItem.page.code);

      return curr;
    }

    // Nodes with children should run recursively because if we just call
    // "toString" method on it, it will end up returning a string containing
    // code mdx code comments and jsx tags, etc
    if (item.children) {
      const childrenItem = await parseMdxData(
        path,
        toString,
        item,
        lastHeaderId,
        mdxImportedComponents
      );

      return mergeChildTree(curr, childrenItem);
    }

    // If type is jsx, it can two things: It is some component being used
    // or some html tags wrapping text. If its a component, we check if its
    // a mdx component and if so, we extract its syntax tree recursively.
    // Any other kind of jsx tag is removed, only leaving its content as text
    if (item.type === 'jsx') {
      const usedImportedComponents = Object.keys(mdxImportedComponents).filter(
        (component) => new RegExp(`(<${component}([^>]+)>)`).test(item.value)
      );

      if (usedImportedComponents.length > 0) {
        // If this node is using an imported mdx component, then we go through all used
        // components and parse it as mdx in order to extract its data for the search
        await Promise.all(
          usedImportedComponents.map(async (usedImportedComponent) => {
            const componentPath = `${path}/${mdxImportedComponents[usedImportedComponent]}`;
            const importedComponentSyntaxTree = await extractSyntaxTree(
              componentPath
            );
            const importedComponentData = await parseMdxData(
              componentPath,
              toString,
              importedComponentSyntaxTree,
              lastHeaderId,
              mdxImportedComponents
            );
            curr = mergeChildTree(curr, importedComponentData);
          })
        );

        return curr;
      }

      // Any other kind of jsx tag is removed, only leaving its content as text
      const jsxString = toString(item).replace(/(<([^>]+)>)/gi, '');

      // Cleanup empty strings and solo line breaks after tags removal
      if (jsxString !== '\n' && jsxString !== '') {
        curr[lastHeaderId].text.push(jsxString);
      }
      return curr;
    }

    // If code, we just push its content
    if (item.type === 'code') {
      curr[lastHeaderId].code.push(toString(item));
      return curr;
    }

    // These tags tags should be ignored
    if (
      item.type === 'import' &&
      item.type === 'image' &&
      item.type === 'comment' &&
      item.type === 'thematicBreak'
    ) {
      return curr;
    }

    // Any other tag should be parsed to string
    curr[lastHeaderId].text.push(toString(item));

    return curr;
  }, Promise.resolve(initialReduceValue));
};

const extractMdxData = async (path) => {
  return (async () => {
    const { toString } = await import('mdast-util-to-string');
    const syntaxTree = await extractSyntaxTree(path);

    const splitDirPath = path.split('/');

    // pops filename from path
    splitDirPath.pop();

    const { page, ...headers } = await parseMdxData(
      splitDirPath.join('/'),
      toString,
      syntaxTree
    );

    return { page, headers: Object.values(headers) };
  })();
};

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const extractDocsData = async (docsContent) => {
  const sdksContent = Object.entries(docsContent);
  // Basically we navigate through the content object utill we get to the
  // doc objects which contain the information about a doc page
  const docs = sdksContent.map(([sdkKey, sdkContent], platformIndex) => {
    return sdkContent.loadedVersions.map((sdkContentVersion, versionIndex) => {
      return sdkContentVersion.docs
        .filter((sdkDocVersion) => {
          // Filters ignored directories
          return IGNORED_DIRECTORIES.find((ignoredDir) =>
            sdkDocVersion.sourceDirName.includes(ignoredDir)
          );
        })
        .map(async (sdkDocVersion, pageIndex) => {
          const [_, ...reversedSections] = sdkDocVersion.unversionedId
            .split('/')
            .reverse();
          const sections = reversedSections.reverse();
          const sectionsSlug = sections.join('/');
          // Once we dont have the header data/page content on the object generated by
          // docusaurus, we need to extract it manually from the md/mdx file
          const { page: pageData, headers: pageHeadersData } =
            await extractMdxData(sdkDocVersion.source.replace('@site/', ''));

          const version = sdkDocVersion.version;
          const page_id = parseInt(
            `${platformIndex}${versionIndex}${pageIndex}`
          );
          const name = sdkDocVersion.title;
          // Last version urls actually have no versions
          // We use the label here instead of the name because the
          // url is based on the lab ex: current version has the next label
          // and in the url it uses next
          const slug = sdkContentVersion.isLast
            ? sdkDocVersion.slug.substring(1)
            : `${sdkContentVersion.versionLabel.toLowerCase()}/${sdkDocVersion.slug.substring(
                1
              )}`;
          const section_name = sections
            .map((section_slug) => capitalizeFirstLetter(section_slug))
            .join(' > ');
          const section_slug = sectionsSlug;
          const section_id = sectionsSlug;
          const parent_section_name = 'Chat API Docs';
          const parent_section_slug = 'chat_docs';
          const parent_section_id = 'chat_docs';
          const platform = platformMapping[sdkKey];
          const content_serialized_text = pageData && pageData.text.join('\n');
          const code_sample = pageData && pageData.code.join('\n');
          const pageObjectID = `${platformMapping[sdkKey]}-${sdkDocVersion.version}-${pageIndex}-`;

          const pageObject = {
            version,
            page_id,
            header_id: '',
            name,
            slug,
            section_name,
            section_slug,
            section_id,
            parent_section_name,
            parent_section_slug,
            parent_section_id,
            platform,
            content_serialized_text,
            code_sample,
            objectID: pageObjectID,
          };
          return [
            pageObject,
            ...pageHeadersData.map((headerData) => {
              const header_id = headerData.headerId
                .toLowerCase()
                .replace(/\s/g, '-');
              return {
                version,
                page_id,
                header_id,
                name,
                slug,
                section_name,
                section_slug,
                section_id,
                parent_section_name,
                parent_section_slug,
                parent_section_id,
                platform,
                content_serialized_text: headerData.text.join('\n'),
                code_sample: headerData.code.join('\n'),
                objectID: `${pageObjectID}${header_id}`,
              };
            }),
          ];
        });
    });
  });

  const resolvedDocs = await Promise.all(docs.flat(Infinity));

  return resolvedDocs.flat(Infinity);
};

module.exports = () => {
  let allContent = null;
  return {
    name: 'algolia-index',
    async contentLoaded({ allContent: loadedContent }) {
      // This is only available on contentLoad event but
      // this event its called multiple times during the build
      // phase, so we store the value in this variable and use it
      // in the post build script which is called only once
      if (process.env.NODE_ENV === 'production') {
        allContent = loadedContent;
      }
    },
    async postBuild() {
      if (process.env.NODE_ENV === 'production') {
        const docsContent = allContent['docusaurus-plugin-content-docs'];
        const docsData = await extractDocsData(docsContent);
        return new Promise((res, rej) => {
          fs.writeFile(
            './algolia-objects.json',
            JSON.stringify(docsData),
            (err) => {
              if (err) {
                throw rej(err);
              }
              console.log(
                'algolia json data generated for: ',
                docsData.map((doc) => doc.objectID)
              );
              res();
            }
          );
        });
      }
    },
  };
};

const fs = require('fs');
const mdx = require('@mdx-js/mdx');
const admonitions = require('remark-admonitions');
const {
  parseFrontMatter,
  parseMarkdownContentTitle,
} = require('@docusaurus/utils');

const { platformMapping } = require('../constants');

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

const parseMdxData = (toString, syntaxTree, lastHeaderIdParam) => {
  let lastHeaderId = undefined;
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
  return syntaxTree.children.reduce((curr, item) => {
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
      const pageItem = parseMdxData(toString, { children: [item] }, 'page');

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
      const admonitionItem = parseMdxData(toString, item, lastHeaderId);
      curr[lastHeaderId].text.push(admonitionItem[lastHeaderId].text.join(' '));
      curr[lastHeaderId].code.push(...admonitionItem[lastHeaderId].code);
      return curr;
    }

    // If type is jsx, it can two things: It is some component being used
    // or some html tags wrapping text. Either way we just remove
    // any kind of jsx tag and only leave its content as text
    // and then push it.
    if (item.type === 'jsx') {
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
  }, initialReduceValue);
};

const extractMdxData = async (path) => {
  // This IIFE is needed in order to perform the import from
  // mdast-util-to-string once its an es6-only module
  // and our plugins only use commonjs modules
  return (async () => {
    const { toString } = await import('mdast-util-to-string');
    const syntaxTree = await extractSyntaxTree(path);

    const { page, ...headers } = parseMdxData(toString, syntaxTree);
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
      return sdkContentVersion.docs.map(async (sdkDocVersion, pageIndex) => {
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
        const page_id = parseInt(`${platformIndex}${versionIndex}${pageIndex}`);
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

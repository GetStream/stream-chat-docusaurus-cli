const fs = require('fs');
const mdx = require('@mdx-js/mdx');
const algoliasearch = require('algoliasearch/lite');

const {
  parseFrontMatter,
  parseMarkdownContentTitle,
} = require('@docusaurus/utils');

const { platformMapping } = require('../constants');

function extractSyntaxTree(path) {
  return new Promise((res) => {
    var doc = fs.readFileSync(path, 'utf8');

    const { content: contentWithTitle } = parseFrontMatter(doc);

    const { content } = parseMarkdownContentTitle(contentWithTitle);

    mdx.sync(content, {
      skipExport: true,
      remarkPlugins: [
        () => (ast) => {
          res(ast);
          return ast;
        },
      ],
    });
  });
}

async function extractMdxData(path) {
  return (async () => {
    const { toString } = await import('mdast-util-to-string');
    const syntaxTree = await extractSyntaxTree(path);

    let lastHeaderId = null;

    const result = syntaxTree.children.reduce((curr, item) => {
      if (item.type === 'heading') {
        if (
          curr[lastHeaderId] &&
          curr[lastHeaderId].text.length === 0 &&
          curr[lastHeaderId].code.length === 0
        ) {
          // cleanup empty items
          delete curr[lastHeaderId];
        }
        lastHeaderId = toString(item).replace(' ', '-');
        curr[lastHeaderId] = { headerId: lastHeaderId, text: [], code: [] };
      }
      if (!curr[lastHeaderId]) return curr;
      if (item.type === 'paragraph')
        curr[lastHeaderId].text.push(toString(item));
      if (item.type === 'code') curr[lastHeaderId].code.push(toString(item));
      return curr;
    }, {});

    return Object.values(result);
  })();
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

async function extractDocsData(docsContent) {
  const sdksContent = Object.entries(docsContent);
  const docs = sdksContent.map(([sdkKey, sdkContent], platformIndex) => {
    return sdkContent.loadedVersions.map((sdkContentVersion, versionIndex) => {
      return sdkContentVersion.docs.map(async (sdkDocVersion, pageIndex) => {
        const [_, ...reversedSections] = sdkDocVersion.unversionedId
          .split('/')
          .reverse();
        const sections = reversedSections.reverse();
        const sectionsSlug = sections.join('/');
        const pageHeaderData = await extractMdxData(
          sdkDocVersion.source.replace('@site/', '')
        );

        const version = sdkDocVersion.version;
        const page_id = parseInt(`${platformIndex}${versionIndex}${pageIndex}`);
        const name = sdkDocVersion.title;
        const slug = sdkDocVersion.slug.substring(1);
        const section_name = sections
          .map((section_slug) => capitalizeFirstLetter(section_slug))
          .join(' > ');
        const section_slug = sectionsSlug;
        const section_id = sectionsSlug;
        const parent_section_name = 'Chat API Docs';
        const parent_section_slug = 'chat_docs';
        const parent_section_id = 'chat_docs';
        const platform = platformMapping[sdkKey];
        const content_serialized_text = sdkDocVersion.description;
        const pageObjectID = `${platformMapping[sdkKey]}-${sdkDocVersion.version}-${pageIndex}-`;

        const pageData = {
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
          objectID: pageObjectID,
        };
        return [
          pageData,
          ...pageHeaderData.map((headerData) => {
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
}

module.exports = function (context, options) {
  let allContent = null;
  return {
    name: 'algolia-index',
    async contentLoaded({ allContent: loadedContent }) {
      allContent = loadedContent;
    },
    async postBuild() {
      if (process.env.ALGOLIA_APP_ID && process.env.ALGOLIA_API_WRITE_KEY) {
        const client = algoliasearch(
          process.env.ALGOLIA_APP_ID,
          process.env.ALGOLIA_API_WRITE_KEY
        );
        const docsContent = allContent['docusaurus-plugin-content-docs'];
        const docsData = await extractDocsData(docsContent);
        const index = client.initIndex('DOCUSSAURUS');

        return index
          .replaceAllObjects(docsData)
          .then(({ objectIDs }) => {
            console.log('Updated Algolia index for: ', objectIDs);
          })
          .catch((e) => console.log('ERROR: ', e));
      }
    },
  };
};

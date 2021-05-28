/* eslint-disable no-undef */
/** @type {import('@docusaurus/types').DocusaurusConfig} */

const fs = require('fs');
const path = require('path');

const { BASE_URL, folderMapping, languageMapping } = require('./constants');

const STREAM_SDK_DOCUSAURUS_PATH = '../docusaurus';

require('dotenv').config({
  path: __dirname + `/${STREAM_SDK_DOCUSAURUS_PATH}/.env`,
});

const CUSTOM_PLUGIN_REGEX = /^docusaurus.*\.plugin.js$/;

const DOCUSAURUS_DIR = fs.readdirSync(STREAM_SDK_DOCUSAURUS_PATH);
const DOCS_DIR = fs.readdirSync(`${STREAM_SDK_DOCUSAURUS_PATH}/docs`);

const SDK_FOLDERS = DOCS_DIR.filter((file) =>
  fs.lstatSync(`${STREAM_SDK_DOCUSAURUS_PATH}/docs/${file}`).isDirectory()
);

const CUSTOM_PLUGIN_FILES = DOCUSAURUS_DIR.filter((file) =>
  CUSTOM_PLUGIN_REGEX.test(file)
);

const CUSTOM_PLUGINS = CUSTOM_PLUGIN_FILES.map((file) => {
  const sdkConfig = require(path.join(STREAM_SDK_DOCUSAURUS_PATH, file));
  return sdkConfig.plugins;
}).flat();

const defaultPlugins = SDK_FOLDERS.map((SDK) => {
  const strippedSDK = SDK.toLowerCase().replace(' ', '');
  const sidebarPath = `${STREAM_SDK_DOCUSAURUS_PATH}/sidebars${folderMapping[
    strippedSDK
  ]
    .replace(' ', '')
    .replace(/^\w/, (c) => c.toUpperCase())}.json`;
  return [
    '@docusaurus/plugin-content-docs',
    {
      id: strippedSDK,
      path: `${STREAM_SDK_DOCUSAURUS_PATH}/docs/${SDK}`,
      routeBasePath: strippedSDK,
      ...(fs.existsSync(sidebarPath)
        ? {
            sidebarPath: require.resolve(sidebarPath),
          }
        : {}),
    },
  ];
});

const navbarSDKItems = SDK_FOLDERS.map((SDK) => {
  const strippedSDK = SDK.toLowerCase().replace(' ', '');
  const readableSDK = folderMapping[strippedSDK] || SDK;
  return {
    label: readableSDK,
    to: `${strippedSDK}/?language=${languageMapping[strippedSDK]}`,
    type: 'doc',
  };
});

const navbarVersionItems = SDK_FOLDERS.map((SDK) => ({
  docsPluginId: SDK.toLowerCase().replace(' ', ''),
  type: 'docsVersionDropdown',
}));

module.exports = {
  baseUrl: BASE_URL,
  favicon: 'https://getstream.imgix.net/images/favicons/favicon-96x96.png',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  organizationName: 'GetStream',
  plugins: [
    ...defaultPlugins,
    ...CUSTOM_PLUGINS,
    '@docusaurus/plugin-content-pages',
    'docusaurus-plugin-sass',
    path.resolve(__dirname, 'src/symlink-docusaurus'),
    path.resolve(__dirname, 'src/define-env-vars-plugin'),
    path.resolve(__dirname, 'src/build-algolia-objects'),
  ],
  projectName: 'stream-chat',
  tagline: 'Stream Chat official component SDKs',
  themeConfig: {
    // Docusaurus forces us to pass these values even if they are not internally used.
    // Theyre only used to show/hide the search bar in our case.
    algolia: {
      appId: 'MOCK',
      apiKey: 'MOCK',
      indexName: 'MOCK',
    },
    liveCodeBlock: {
      playgroundPosition: 'bottom',
    },
    navbar: {
      items: [
        {
          href: 'https://github.com/GetStream',
          label: 'GitHub',
          position: 'right',
        },
        {
          items: navbarSDKItems,
          label: 'SDK',
          position: 'left',
        },
        ...navbarVersionItems,
      ],
      logo: {
        alt: 'stream',
        src: 'img/logo.svg',
      },
      title: 'stream',
    },
  },
  themes: [
    ['@docusaurus/theme-classic', { 
      customCss: [
        require.resolve('./src/css/custom.scss'),
        require.resolve('./src/css/menu.scss'),
        require.resolve('./src/css/toc.scss'),
      ]
    }],
    '@docusaurus/theme-live-codeblock',
    '@docusaurus/theme-search-algolia',
  ],
  title: 'Stream Chat - Component SDK Docs',
  url: 'https://getstream.io',
};

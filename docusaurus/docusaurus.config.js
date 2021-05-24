/* eslint-disable no-undef */
/** @type {import('@docusaurus/types').DocusaurusConfig} */

const fs = require('fs');
const path = require('path');

const { folderMapping, languageMapping } = require('./constants');

const STREAM_SDK_DOCUSAURUS_PATH = '../docusaurus';

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
  baseUrl: '/chat/docs/sdk/',
  favicon: 'https://getstream.imgix.net/images/favicons/favicon-96x96.png',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  organizationName: 'GetStream',
  plugins: [
    ...defaultPlugins,
    ...CUSTOM_PLUGINS,
    '@docusaurus/plugin-content-pages',
    path.resolve(__dirname, 'src/symlink-docusaurus'),
    path.resolve(__dirname, 'src/build-algolia-objects'),
  ],
  projectName: 'stream-chat',
  tagline: 'Stream Chat official component SDKs',
  themeConfig: {
    algolia: {
      apiKey: 'fd1b03de28081b5aa29dbccced4620b9',
      indexName: 'DOCS',
      appId: '7RY30ISS74',
      // contextualSearch: true,
    },
    footer: {
      copyright: '© Stream.IO, Inc. All Rights Reserved.',
      links: [
        {
          items: [
            {
              href: 'https://twitter.com/getstream_io',
              label: 'Twitter',
            },
          ],
          title: 'Community',
        },
        {
          items: [
            {
              href: 'https://github.com/GetStream',
              label: 'GitHub',
            },
          ],
          title: 'More',
        },
      ],
      style: 'dark',
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
    '@docusaurus/theme-classic',
    '@docusaurus/theme-live-codeblock',
    '@docusaurus/theme-search-algolia',
  ],
  title: 'Stream Chat - Component SDK Docs',
  url: 'https://getstream.io',
};

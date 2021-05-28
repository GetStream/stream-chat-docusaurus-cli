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

const CUSTOM_CSS_PATH = path.join(__dirname, 'src/css');
const CUSTOM_CSS_FILES = fs.readdirSync(CUSTOM_CSS_PATH).map(file => `${CUSTOM_CSS_PATH}/${file}`);

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
      admonitions: {
        infima: true,
        customTypes: {
          note: {
            ifmClass: 'note',
            svg: '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 13.7A6.7 6.7 0 117 .3a6.7 6.7 0 010 13.4zm0-1.4A5.3 5.3 0 107 1.7a5.3 5.3 0 100 10.6zm-.7-8.6h1.4V5H6.3V3.7zm0 2.6h1.4v4H6.3v-4z" fill="#000" fill-opacity=".4"/></svg>'
          },
          info: {
            ifmClass: 'info',
            svg: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g fill="#00DFFF"><path d="M10 12.7H6c-.4 0-.7-.3-.7-.7v-.3c0-1-.4-1.9-1.1-2.6-1-1.1-1.6-2.5-1.5-4C2.8 2.3 5 .1 7.9 0H8a5.3 5.3 0 013.7 9.1c-.7.7-1 1.6-1 2.6v.3c0 .4-.3.7-.7.7zm-3.3-1.4h2.6a5 5 0 011.5-3.2c.8-.7 1.2-1.7 1.2-2.8a4 4 0 00-4-4 4 4 0 00-4 3.9 4 4 0 001.1 3c1 .9 1.5 2 1.6 3.1z"/><path d="M8 16a2.7 2.7 0 01-2.7-2.7V12c0-.4.3-.7.7-.7h4c.4 0 .7.3.7.7v1.3c0 1.5-1.2 2.7-2.7 2.7zm-1.3-3.3v.6c0 .8.6 1.4 1.3 1.4.7 0 1.3-.6 1.3-1.4v-.6H6.7zM6 6c-.4 0-.7-.3-.7-.7C5.3 4 6.5 2.7 8 2.7c.4 0 .7.2.7.6 0 .4-.3.7-.7.7-.7 0-1.3.6-1.3 1.3 0 .4-.3.7-.7.7z"/></g></svg>'
          },
          tip: {
            ifmClass: 'success',
            svg: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g fill="#40df01"><path d="M10 12.7H6c-.4 0-.7-.3-.7-.7v-.3c0-1-.4-1.9-1.1-2.6-1-1.1-1.6-2.5-1.5-4C2.8 2.3 5 .1 7.9 0H8a5.3 5.3 0 013.7 9.1c-.7.7-1 1.6-1 2.6v.3c0 .4-.3.7-.7.7zm-3.3-1.4h2.6a5 5 0 011.5-3.2c.8-.7 1.2-1.7 1.2-2.8a4 4 0 00-4-4 4 4 0 00-4 3.9 4 4 0 001.1 3c1 .9 1.5 2 1.6 3.1z"/><path d="M8 16a2.7 2.7 0 01-2.7-2.7V12c0-.4.3-.7.7-.7h4c.4 0 .7.3.7.7v1.3c0 1.5-1.2 2.7-2.7 2.7zm-1.3-3.3v.6c0 .8.6 1.4 1.3 1.4.7 0 1.3-.6 1.3-1.4v-.6H6.7zM6 6c-.4 0-.7-.3-.7-.7C5.3 4 6.5 2.7 8 2.7c.4 0 .7.2.7.6 0 .4-.3.7-.7.7-.7 0-1.3.6-1.3 1.3 0 .4-.3.7-.7.7z"/></g></svg>'
          },
          caution: {
            ifmClass: 'warning',
            svg: '<svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g fill="#FECF29"><path d="M16.3 15.3H1.6A.7.7 0 011 15a.6.6 0 010-.7L8.4 1c.2-.4.9-.4 1.2 0l7.3 13.3v.7c-.1.2-.3.3-.6.3zM2.8 14h12.4L9 2.7 2.8 14z"/><path d="M9 10.7c-.4 0-.7-.3-.7-.7V6.7c0-.4.3-.7.7-.7.4 0 .6.3.6.7V10c0 .4-.2.7-.6.7zM9.4 11.5a.7.7 0 11-1 1 .7.7 0 011-1z"/><path d="M9 13a1 1 0 01-1-1c0-.5.4-1 1-1 .5 0 1 .5 1 1s-.5 1-1 1zm0-1.3c-.2 0-.4.1-.4.3 0 .2.2.3.4.3s.3-.1.3-.3c0-.2-.1-.3-.3-.3z"/></g></svg>'
          },
          danger: {
            ifmClass: 'danger',
            svg: '<svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 15.3a5 5 0 005-5 5 5 0 00-.4-1.6c-1 1-2 1.6-2.5 1.6 2.7-4.6 1.2-6.6-2.8-9.3.3 3.3-1.9 4.8-2.8 5.7A5 5 0 009 15.3zm.4-11.8c2.2 1.8 2.2 3.2.5 6.2-.5.9.2 2 1.2 2 .5 0 1-.2 1.4-.4a3.7 3.7 0 11-6-3.6l.5-.5.7-.7a7 7 0 001.7-3z" fill="#FE2929"/></svg>'
          }
        }

      }
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
    [
      '@docusaurus/theme-classic',
      { 
        customCss: [
          ...CUSTOM_CSS_FILES,
        ],
      }
    ],
    '@docusaurus/theme-live-codeblock',
    '@docusaurus/theme-search-algolia',
  ],
  title: 'Stream Chat - Component SDK Docs',
  url: 'https://getstream.io',
};

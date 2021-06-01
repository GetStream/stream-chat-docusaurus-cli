/* eslint-disable no-undef */
/** @type {import('@docusaurus/types').DocusaurusConfig} */

const fs = require('fs');
const path = require('path');

const { BASE_URL, folderMapping, languageMapping } = require('./constants');
const Icons = require('./admonition-icons');

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
  const sidebarPathWithoutExtension = `${STREAM_SDK_DOCUSAURUS_PATH}/sidebars-${folderMapping[
    strippedSDK
  ]
    .toLowerCase()
    .replace(' ', '-')}`;

  const jsSidebarPath = `${sidebarPathWithoutExtension}.js`;
  const jsonSidebarPath = `${sidebarPathWithoutExtension}.json`;

  const sidebarPath = fs.existsSync(jsSidebarPath)
    ? jsSidebarPath
    : jsonSidebarPath;

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
            svg: Icons.note
          },
          info: {
            ifmClass: 'info',
            svg: Icons.info
          },
          tip: {
            ifmClass: 'success',
            svg: Icons.tip
          },
          caution: {
            ifmClass: 'warning',
            svg: Icons.caution
          },
          danger: {
            ifmClass: 'danger',
            svg: Icons.danger
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
    colorMode: {
      disableSwitch: true,
    },
    liveCodeBlock: {
      playgroundPosition: 'bottom',
    },
    navbar: {
      items: [
        {
          href: 'https://getstream.io/try-for-free/',
          label: 'Sign Up',
          position: 'right',
          className: 'navbar__link__sign-up'
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
        href: 'https://getstream.io/'
      },
      title: 'Chat Messaging',
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

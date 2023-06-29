/* eslint-disable no-undef */
/** @type {import('@docusaurus/types').DocusaurusConfig} */
const fs = require("node:fs")
const path = require("node:path")

const STREAM_SDK_DOCUSAURUS_PATH = path.join(
  process.env.CURRENT_WORKING_PATH,
  "docusaurus"
)

require("dotenv").config({
  path: path.join(STREAM_SDK_DOCUSAURUS_PATH, ".env"),
})

if (!process.env.PRODUCT) {
  process.env.PRODUCT = "chat"
}

const {
  folderMapping,
  IGNORED_DIRECTORIES,
  SDK_ORDER,
  ignoredVideoSDKsStaging,
  ignoredVideoSDKsProduction,
} = require("./constants")
const URLS = require("./urls")
const productVariables = require("./src/product-variables")
const Icons = require("./admonition-icons")

const getCustomPluginRegExp = (prefix = "") =>
  new RegExp(`^${prefix}docusaurus.*\.plugin.js$`)

const DOCUSAURUS_DIR_CONTENTS = fs.readdirSync(STREAM_SDK_DOCUSAURUS_PATH)
const DOCS_DIR = fs.readdirSync(`${STREAM_SDK_DOCUSAURUS_PATH}/docs`)

const PRODUCT = process.env.PRODUCT
const label = PRODUCT === "video" ? "Video docs" : "SDK"
const {
  productTitle,
  docusaurus: { title: navbarTitle },
} = productVariables[PRODUCT]

let SDK_FOLDERS = DOCS_DIR.filter(file => {
  if (PRODUCT === "video") {
    if (
      process.env.DEPLOYMENT_ENV === "production" &&
      ignoredVideoSDKsProduction.includes(file)
    ) {
      return false
    } else if (
      process.env.DEPLOYMENT_ENV === "staging" &&
      ignoredVideoSDKsStaging.includes(file)
    ) {
      return false
    }
  }

  return fs
    .lstatSync(`${STREAM_SDK_DOCUSAURUS_PATH}/docs/${file}`)
    .isDirectory()
})

SDK_FOLDERS = SDK_FOLDERS.sort((a, b) => {
  const aIndex = SDK_ORDER.indexOf(a.toLowerCase()) ?? 1000
  const bIndex = SDK_ORDER.indexOf(b.toLowerCase()) ?? 1000
  return aIndex - bIndex
})

const CUSTOM_PLUGIN_FILES = DOCUSAURUS_DIR_CONTENTS.filter(file =>
  getCustomPluginRegExp().test(file)
)

const CUSTOM_PLUGINS = CUSTOM_PLUGIN_FILES.map(file => {
  const sdkConfig = require(path.join(STREAM_SDK_DOCUSAURUS_PATH, file))
  return sdkConfig.plugins
}).flat()

/**
 * Named to indicate that this is used with any plugin file
 * with a prefix that is an SDK name, although in reality
 * it can be any prefix.
 *
 * If it's needed to ensure that the prefix is an SDK name,
 * the parameter to getCustomPluginRegex could be this:
 *
 * ```
 * `(${Object.keys(foldermapping).join('|')})-`
 * ```
 * */
const SDK_CUSTOM_PLUGINS = DOCUSAURUS_DIR_CONTENTS.filter(file =>
  getCustomPluginRegExp(".*-").test(file)
).reduce((files, file) => {
  const pluginModule = require(path.join(STREAM_SDK_DOCUSAURUS_PATH, file))
  return { ...files, [file]: pluginModule.plugins }
}, {})

const getCustomPluginFilesForSDK = sdk =>
  Object.keys(SDK_CUSTOM_PLUGINS)
    .filter(file => getCustomPluginRegExp(`${sdk}-`).test(file))
    .map(file => SDK_CUSTOM_PLUGINS[file])

const CUSTOM_CSS_PATH = path.join(__dirname, "src/css/components")
const CUSTOM_CSS_FILES = fs
  .readdirSync(CUSTOM_CSS_PATH)
  .map(file => `${CUSTOM_CSS_PATH}/${file}`)

const pluginWithId = pluginId => plugin => plugin[0] === pluginId
const fileWithPluginId = pluginId => files =>
  Array.from(files).find(pluginWithId(pluginId))

const getPluginFileForSDK = (sdk, pluginId) =>
  getCustomPluginFilesForSDK(sdk).find(fileWithPluginId(pluginId)) ?? []

const getCustomPluginForSDK = (sdk, pluginId) =>
  getPluginFileForSDK(sdk, pluginId).find(pluginWithId(pluginId))

const defaultPlugins = SDK_FOLDERS.map(SDK => {
  const strippedSDK = SDK.toLowerCase().replace(" ", "")
  const sidebarPathWithoutExtension = `${STREAM_SDK_DOCUSAURUS_PATH}/sidebars-${folderMapping[
    strippedSDK
  ]
    .toLowerCase()
    .replace(" ", "-")}`

  const jsSidebarPath = `${sidebarPathWithoutExtension}.js`
  const jsonSidebarPath = `${sidebarPathWithoutExtension}.json`

  const sidebarPath = fs.existsSync(jsSidebarPath)
    ? jsSidebarPath
    : jsonSidebarPath

  const pluginId = "@docusaurus/plugin-content-docs"

  const defaultConfiguration = {
    sidebarItemsGenerator: async function ({
      defaultSidebarItemsGenerator,
      ...args
    }) {
      const sidebarItems = await defaultSidebarItemsGenerator(args)
      return sidebarItems.filter(item => {
        return !IGNORED_DIRECTORIES.includes(item.label)
      })
    },
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
          ifmClass: "note",
          svg: Icons.note,
        },
        tip: {
          ifmClass: "tip",
          svg: Icons.tip,
        },
        info: {
          ifmClass: "info",
          svg: Icons.info,
        },
        caution: {
          ifmClass: "warning",
          svg: Icons.caution,
        },
        danger: {
          ifmClass: "danger",
          svg: Icons.danger,
        },
      },
    },
  }

  /**
   * Merge configuration from a custom plugin file if one exists
   * with the same plugin ID.
   *
   * This allows an SDK to provide their own configuration for
   * this plugin.
   *
   * The plugins are structured as ['pluginId', configurationObject]
   * and since docusaurus validates the plugins during a build,
   * we don't do any extra validation here for this.
   * */
  const customPlugin = getCustomPluginForSDK(strippedSDK, pluginId)
  const customConfiguration = customPlugin ? customPlugin[1] : {}

  return [pluginId, { ...defaultConfiguration, ...customConfiguration }]
})

const navbarSDKItems = SDK_FOLDERS.map(SDK => {
  const strippedSDK = SDK.toLowerCase().replace(" ", "")
  const readableSDK = folderMapping[strippedSDK] || SDK
  return {
    label: readableSDK,
    id: strippedSDK,
    className: `dropdown__link__${strippedSDK}`,
    docsPluginId: strippedSDK,
    docId: "none",
    to: `${strippedSDK}/`,
    type: "doc",
  }
})

// We have one section in the dropdown, which says 'SDK'.
if (process.env.PRODUCT === "video") {
  navbarSDKItems.splice(0, 0, {
    label: "SDKs",
    className: "navbar__break",
    href: "#",
  })
}

const navbarVersionItems = SDK_FOLDERS.map(SDK => ({
  docsPluginId: SDK.toLowerCase().replace(" ", ""),
  type: "docsVersionDropdown",
  className: "navbar__link__custom-dropdown--version",
}))

const navbarGithubItem = {
  label: "github",
  href: URLS.github_root,
  position: "left",
  className: "navbar__link__github",
  "aria-label": "Github repository",
  mobile: false,
}

const navbarItems = [
  {
    type: "search",
    position: "right",
  },
  {
    href: URLS.website.signup,
    label: "Sign Up",
    position: "right",
    className: "navbar__link__sign-up",
    mobile: false,
  },
  ...navbarVersionItems,
  navbarGithubItem,
]

if (navbarSDKItems.length > 1) {
  navbarItems.unshift({
    items: navbarSDKItems,
    label,
    className: "navbar__link__custom-dropdown--sdks",
    position: "left",
  })
}

const plugins = [...defaultPlugins, ...CUSTOM_PLUGINS]

if (process.env.DEPLOYMENT_ENV === "production") {
  plugins.push([
    "@docusaurus/plugin-google-gtag",
    {
      trackingID: process.env.GOOGLE_TAG_TRACKING_ID || "DEFAULT",
    },
  ])
}

/**
 * For video, we want to embed the homepage in the content repository.
 */
if (process.env.SOURCE_HOMEPAGE) {
  plugins.push([
    "@docusaurus/plugin-content-pages",
    {
      path: path.join(STREAM_SDK_DOCUSAURUS_PATH, "pages"),
    },
  ])
} else {
  plugins.push("@docusaurus/plugin-content-pages")
}

plugins.push(
  "docusaurus-plugin-sass",
  path.resolve(__dirname, "src/symlink-docusaurus"),
  path.resolve(__dirname, "src/define-env-vars-plugin"),
  path.resolve(__dirname, "src/build-algolia-objects")
)

module.exports = {
  baseUrl: URLS.docs.root,
  trailingSlash: true,
  favicon: "https://getstream.imgix.net/images/favicons/favicon-96x96.png",
  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",
  organizationName: "GetStream",
  plugins,
  projectName: `stream-${PRODUCT}`,
  tagline: `Stream ${productTitle} Component SDKs`,
  themeConfig: {
    // Docusaurus forces us to pass these values even if they are not internally used.
    // Theyre only used to show/hide the search bar in our case.
    algolia: {
      appId: "MOCK",
      apiKey: "MOCK",
      indexName: "MOCK",
    },
    colorMode: {
      disableSwitch: true,
    },
    liveCodeBlock: {
      playgroundPosition: "bottom",
    },
    navbar: {
      items: navbarItems,
      logo: {
        alt: "Stream docs logo",
        src: "img/logo.svg",
      },
      title: navbarTitle,
    },
    metadata: [{ name: "twitter:card", content: "summary_large_image" }],
    hideableSidebar: true,
  },
  themes: [
    [
      "@docusaurus/theme-classic",
      {
        customCss: [
          require.resolve("./src/css/custom.scss"),
          ...CUSTOM_CSS_FILES,
        ],
      },
    ],
    "@docusaurus/theme-live-codeblock",
    "@docusaurus/theme-search-algolia",
  ],
  title: `Stream ${productTitle} - Component SDK Docs`,
  url: URLS.website.root,
}

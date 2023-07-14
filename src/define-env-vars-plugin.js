const webpack = require("webpack")
const environment = require("./environment")

// This plugin defines which env vars will be exposed to the webpack build
// We are limiting ourselves to the ones declared in the environment.js file

const OPTIONAL_VARIABLES = [
  "ALGOLIA_API_KEY",
  "ALGOLIA_APP_ID",
  "DEPLOYMENT_ENV",
  "GOOGLE_TAG_TRACKING_ID",
  "PRODUCT",
  "WEBSITE_BASE_URL",
]

const filteredVariables = Object.keys(environment).reduce((acc, item) => {
  if (OPTIONAL_VARIABLES.includes(item)) return acc
  acc[item] = process.env[item]
  return acc
}, {})

module.exports = function () {
  return {
    name: "define-env-vars-plugin",
    configureWebpack() {
      return {
        plugins: [
          new webpack.EnvironmentPlugin({
            ALGOLIA_API_KEY: "DEFAULT",
            ALGOLIA_APP_ID: "DEFAULT",
            DEPLOYMENT_ENV: process.env.DEPLOYMENT_ENV ?? "staging",
            GOOGLE_TAG_TRACKING_ID: process.env.GOOGLE_TAG_TRACKING_ID ?? "",
            PRODUCT: process.env.PRODUCT ?? "chat",
            WEBSITE_BASE_URL: "DEFAULT",
            ...filteredVariables,
          }),
        ],
        module: {
          rules: [],
        },
      }
    },
  }
}

const webpack = require('webpack');
const environment = require('./environment');

// This plugin defines which env vars will be exposed to the webpack build
// We are limiting ourselves to the ones declared in the environment.js file

const OPTIONAL_VARIABLES = [
  'ALGOLIA_APP_ID',
  'ALGOLIA_API_KEY',
  'WEBSITE_BASE_URL',
  'DEPLOYMENT_ENV',
];

const filteredVariables = Object.keys(environment).reduce((acc, item) => {
  if (OPTIONAL_VARIABLES.includes(item)) return acc;
  acc[item] = process.env[item];
  return acc;
}, {});

module.exports = function () {
  return {
    name: 'define-env-vars-plugin',
    configureWebpack() {
      return {
        plugins: [
          new webpack.EnvironmentPlugin({
            ...filteredVariables,
            ALGOLIA_APP_ID: 'DEFAULT',
            ALGOLIA_API_KEY: 'DEFAULT',
            WEBSITE_BASE_URL: 'DEFAULT',
            DEPLOYMENT_ENV: 'staging',
          }),
        ],
        module: {
          rules: [],
        },
      };
    },
  };
};

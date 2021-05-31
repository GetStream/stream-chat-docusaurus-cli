const webpack = require('webpack');
const environment = require('./environment');

// This plugin defines which env vars will be exposed to the webpack build
// We are limiting ourselves to the ones declared in the environment.js file

const OPTIONAL_VARIABLES = ['ALGOLIA_APP_ID', 'ALGOLIA_API_KEY'];

const filteredVariables = Object.keys(environment).filter((item) =>
  OPTIONAL_VARIABLES.includes(item) ? !!process.env[item] : true
);

module.exports = function () {
  return {
    name: 'define-env-vars-plugin',
    configureWebpack() {
      return {
        plugins: [new webpack.EnvironmentPlugin(filteredVariables)],
        module: {
          rules: [],
        },
      };
    },
  };
};

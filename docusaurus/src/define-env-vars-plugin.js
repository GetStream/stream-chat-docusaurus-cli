const webpack = require('webpack');
const environemnt = require('./environment');

// This plugin defines which env vars will be exposed to the webpack build
// We are limiting ourselves to the ones declared in the environment.js file

module.exports = function () {
  return {
    name: 'define-env-vars-plugin',
    configureWebpack() {
      return {
        plugins: [new webpack.EnvironmentPlugin(Object.keys(environemnt))],
        module: {
          rules: [],
        },
      };
    },
  };
};

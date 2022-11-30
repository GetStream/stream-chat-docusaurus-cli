module.exports = function(context, options) {
    return {
      name: 'symlink-docusaurus',
      configureWebpack(config, isServer, utils) {
        return {
          resolve: {
            symlinks: false
          }
        };
      }
    };
  };
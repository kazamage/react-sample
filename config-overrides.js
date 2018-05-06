const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');
const rewireProvidePlugin = require('react-app-rewire-provide-plugin')
const path = require('path');

module.exports = function override(config, env) {
  config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);
  config = rewireLess.withLoaderOptions(
    {
      modifyVars: {
        '@font-family-no-number': 'Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif;',
        '@font-family': '"Monospaced Number", @font-family-no-number;',
        '@menu-item-color': '#2b2b2b',
        '@menu-dark-bg': '#2b2b2b',
        '@menu-highlight-color': '#fff',
        '@menu-item-active-bg': '#2b2b2b',
        '@menu-dark-submenu-bg': '#2b2b2b',
        '@menu-dark-item-active-bg': '#2b2b2b',
        '@menu-dark-item-selected-bg': '#2b2b2b',
      },
    }
  )(config, env);
  config = rewireProvidePlugin(config, env, {
    React: 'react',
    ReactDOM: 'react-dom',
  });
  config.resolve.alias['@'] = path.join(__dirname, 'src');
  return config;
};

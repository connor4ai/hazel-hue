const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Ensure Metro can resolve react-refresh/runtime
config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  'react-refresh': path.resolve(__dirname, 'node_modules/react-refresh'),
};

module.exports = config;

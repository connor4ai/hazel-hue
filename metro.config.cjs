const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Metro doesn't resolve package.json "exports" by default.
// This causes "Unable to resolve module react-refresh/runtime".
// Use a custom resolver to handle this specific case.
const originalResolveRequest = config.resolver.resolveRequest;
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === 'react-refresh/runtime') {
    return {
      filePath: path.resolve(__dirname, 'node_modules/react-refresh/runtime.js'),
      type: 'sourceFile',
    };
  }
  if (originalResolveRequest) {
    return originalResolveRequest(context, moduleName, platform);
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;

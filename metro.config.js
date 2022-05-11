const exclusionList = require('metro-config/src/defaults/exclusionList');

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  resolver: {
    blockList: exclusionList([
      /node_modules\/.*\/node_modules\/react-native\/.*/,
    ]),
  },
};

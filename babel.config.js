// babel.config.js

//yarn add --dev babel-jest @babel/core @babel/preset-env
module.exports = {
  presets: [['@babel/preset-env', {targets: {node: 'current'}}]],
};

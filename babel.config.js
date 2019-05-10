/* eslint-disable import/no-commonjs, filenames/match-regex */

const presets = [
  [
    '@babel/preset-env',
    {
      modules: false,
      targets: {
        ie: '11',
      },
    },
  ],
];

// include stage 3 proposals
const plugins = [
  [
    '@babel/plugin-transform-runtime',
    {
      corejs: false,
      helpers: false,
      regenerator: true,
      useESModules: false
    }
  ],
  // '@babel/plugin-syntax-dynamic-import',
  // '@babel/plugin-syntax-import-meta',
  // '@babel/plugin-proposal-class-properties',
];

module.exports = { presets, plugins };

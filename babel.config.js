/* eslint-disable import/no-commonjs, filenames/match-regex */

module.exports = {
  presets: [["@babel/preset-env"]],
  // plugins: [
  //   ["@babel/plugin-proposal-class-properties"],
  //   ["@babel/plugin-transform-runtime"]
  // ],
  overrides: [
    {
      test: "./vue",
      presets: [["@vue/babel-preset-app"]],
    },
    {
      test: "./js/frankenstein-wrappers",
      presets: [["@vue/babel-preset-app"]],
    }
  ]
};

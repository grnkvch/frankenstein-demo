/* eslint-disable import/no-commonjs, filenames/match-regex */

module.exports = {
  presets: [["@babel/preset-env"]],
  plugins: [
    ["@babel/plugin-proposal-class-properties"],
    ["@babel/plugin-transform-runtime"]
  ],
  overrides: [
    {
      test: "./react",
      presets: [["@babel/preset-react"]],
    },
    {
      test: "./js/frankenstein-wrappers",
      presets: [["@babel/preset-react"]],
    }
  ]
};

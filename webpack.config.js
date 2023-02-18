const { readdirSync } = require("fs");
const lodash = require("lodash");
const path = require("path");

const TEST_DIR = path.join(__dirname, "tests");

const files = readdirSync(TEST_DIR)
  .filter((x) => x.endsWith(".js"))
  .reduce(
    (all, x) => ({
      ...all,
      [lodash.trimEnd(x, ".js")]: path.join(TEST_DIR, x),
    }),
    {}
  );

module.exports = {
  mode: "production",
  entry: files,
  output: {
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "commonjs",
    filename: "[name].bundle.js",
  },
  module: {
    rules: [{ test: /\.js$/, use: "babel-loader" }],
  },
  target: "web",
  externals: /k6(\/.*)?/,
};

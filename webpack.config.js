const path = require('path');

module.exports = {
  mode: "production",
  entry: {
    index: path.join(__dirname, "src", "index.ts"),
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "index.js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [{ loader: "ts-loader" }],
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname),
    publicPath: "/dist/",
    port: 8080,
  },
  resolve: {
    extensions: [".ts", ".js"],
    modules: [path.join(__dirname, "src"), "node_modules"],
  },
  performance: {
    maxEntrypointSize: 1000000,
    maxAssetSize: 1000000,
  },
};

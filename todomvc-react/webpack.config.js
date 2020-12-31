const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: path.join(__dirname, "./src/main.js"),
  output: {
    path: path.join(__dirname, "./dist"),
    filename: "bundle.js"
  },
  plugins: [
    new htmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html"
    })
  ],
  module: {
    rules: [
      {test: /\.css$/, use: ["style-loader", "css-loader"]},
      {test: /\.scss$/, use: ["style-loader", "css-loader", "sass-loader"]},
      {test: /\.(jpg|png|gif|bmp)$/, use: ["file-loader"]},
      {test: /\.jsx?$/, use: "babel-loader", exclude: /node_modules/}
    ]
  }
}
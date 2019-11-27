import * as path from "path";
import { Configuration } from "webpack";
import nodeExternals from "webpack-node-externals";

const config: Configuration = {
  name: "server",
  target: "node",
  mode: "development",
  entry: path.resolve(__dirname, "src/server.ts"),
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "server.js",
    publicPath: "/",
  },
  resolve: {
    extensions: [".ts"],
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          "ts-loader",
        ],
      },
    ],
  },
  plugins: [],
};

module.exports = (env) => config;

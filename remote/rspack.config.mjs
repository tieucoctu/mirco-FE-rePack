import { rspack } from "@rspack/core";

export default {
  entry: "./src/index.js",
  lazyCompilation: false,
  performance: { hints: false },
  output: { uniqueName: "remote", publicPath: "auto" },
  resolve: { extensions: [".js", ".jsx"] },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "builtin:swc-loader",
        options: {
          jsc: {
            parser: { syntax: "ecmascript", jsx: true },
            transform: { react: { runtime: "automatic" } },
          },
        },
      },
    ],
  },
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: "./public/index.html",
      excludeChunks: ["remote"],
    }),
    new rspack.container.ModuleFederationPlugin({
      name: "remote",
      filename: "remoteEntry.js",
      exposes: {
        "./Button": "./src/Button.jsx",
        "./Product": "./src/Product.jsx",
      },
      shared: {
        react: { singleton: true, requiredVersion: "^19.3.1", strictVersion: false },
        "react-dom": { singleton: true, requiredVersion: "^19.3.1", strictVersion: false },
        "react/jsx-runtime": { singleton: true, requiredVersion: "^19.3.1", strictVersion: false },
        "react/jsx-dev-runtime": { singleton: true, requiredVersion: "^19.3.1", strictVersion: false },
      },
    }),
  ],
  devServer: {
    port: 3001,
    headers: { "Access-Control-Allow-Origin": "*" },
  },
};
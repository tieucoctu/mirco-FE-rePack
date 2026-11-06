import { rspack } from "@rspack/core";

export default {
  entry: "./src/index.js",
  lazyCompilation: false,
  performance: { hints: false },
  output: { uniqueName: "host", publicPath: "auto" },
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
    new rspack.HtmlRspackPlugin({ template: "./public/index.html" }),
    new rspack.container.ModuleFederationPlugin({
      name: "host",
      shared: {
        react: { singleton: true, requiredVersion: "^19.3.1", strictVersion: false },
        "react-dom": { singleton: true, requiredVersion: "^19.3.1", strictVersion: false },
        "react/jsx-runtime": { singleton: true, requiredVersion: "^19.3.1", strictVersion: false },
        "react/jsx-dev-runtime": { singleton: true, requiredVersion: "^19.3.1", strictVersion: false },
      },
    }),
  ],
  devServer: {
    port: 3002,
    headers: { "Access-Control-Allow-Origin": "*" },
  },
};

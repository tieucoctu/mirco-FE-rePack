import { rspack } from "@rspack/core";

export default {
  entry: "./src/index.js",
  lazyCompilation: false,
  performance: { hints: false },
  output: { uniqueName: "remote2", publicPath: "auto" },
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
      excludeChunks: ["remote2"],
    }),
    new rspack.container.ModuleFederationPlugin({
      name: "remote2",
      filename: "remoteEntry.js",
      exposes: {
        "./Banner": "./src/Banner.jsx",
        "./CartBadge": "./src/CartBadge.jsx",
      },
      shared: {
        react: { singleton: true, requiredVersion: "^18.0.0", strictVersion: false },
        "react-dom": { singleton: true, requiredVersion: "^18.0.0", strictVersion: false },
        "react/jsx-runtime": { singleton: true, requiredVersion: "^18.0.0", strictVersion: false },
        "react/jsx-dev-runtime": { singleton: true, requiredVersion: "^18.0.0", strictVersion: false },
      },
    }),
  ],
  devServer: {
    port: 3003,
    headers: { "Access-Control-Allow-Origin": "*" },
  },
};


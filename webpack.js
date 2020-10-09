const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const sveltePreprocess = require("svelte-preprocess");
const { WebpackPluginServe } = require("webpack-plugin-serve");

const outputPath = path.resolve(__dirname, "dist");

module.exports = {
  entry: {
    extension: "./src/js/extension.js",
    icon: "./src/js/icon.js",
  },
  output: {
    filename: "[name].js",
    path: outputPath,
    publicPath: "http://localhost:1234/",
  },
  watch: true,
  mode: "development",
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.(svelte)$/,
        exclude: /node_modules/,
        use: {
          loader: "svelte-loader",
          options: {
            preprocess: sveltePreprocess(),
          },
        },
      },
      {
        loader: "file-loader",
        test: /\.(jpg|png|svg|gif)$/,
        options: {
          name: "[name].[ext]",
        },
      },
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }],
      },
    ],
  },
  resolve: {
    extensions: [".mjs", ".js", ".svelte"],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "./src/css",
          to: outputPath,
          toType: "dir",
        },
      ],
    }),
    new WebpackPluginServe({
      host: "127.0.0.1",
      port: 1234,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      },
      historyFallback: {
        rewrites: [
          {
            from: /^\/.*$/,
            to(context) {
              return `/dist/${context.parsedUrl.pathname.replace("/", "")}`;
            },
          },
        ],
      },
    }),
  ],
};

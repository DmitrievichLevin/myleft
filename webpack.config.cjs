const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");

var isProd = process.env.NODE_ENV === "production";

var plugins = [
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, "src", "index.html"),
    filename: "index.html",
    manifest: "./src/public/manifest.json",
    inject: "body",
    process,
    minify: false,
  }),
];

module.exports = {
  // devtool: "source-map",
  mode: "production",
  entry: ["babel-polyfill", "./src/index.tsx"],
  output: {
    path: path.join(__dirname, "build"),
    filename: isProd ? "[name].[contenthash].js" : "[name].js",
    publicPath: "auto",
  },
  module: {
    rules: [
      {
        test: /\.ejs$/,
        use: ["html-loader", "template-ejs-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        ],
      },
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(tsx|extensions.ts|ts)$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        type: "asset/resource",
      },
      {
        test: /\.(woff(2)?|ttf|otf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        type: "asset/resource",
        include: path.resolve(__dirname, "public", "fonts"),
        dependency: { not: ["url"] },
      },
    ],
  },

  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    fallback: {},
  },
  stats: {
    children: true,
    errorDetails: true,
  },
  optimization: {
    minimize: true,
    portableRecords: true,
    minimizer: [new TerserJSPlugin({})],
  },
  plugins,
};

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');

module.exports = {
    mode: "development",
    entry: "/src/index.js",
    devtool: "inline-source-map",
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, "dist"),
        assetModuleFilename: 'images/[name][ext][query]',
    },
    module: {
        rules:[
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
            }
          },
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader,'css-loader', 'sass-loader'],
            },
            {
                test: /\.(png|svg|jpg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2)$/i,
                type: 'asset/resource',
                generator:
                {
                    filename:'fonts/[name][ext][query]'
                },
            },
        ],
    },
    plugins:[
        new HtmlWebpackPlugin({
            title: "Battleship",
            filename:"index.html",
            template: 'src/index.html'
        }),
        new MiniCssExtractPlugin(),
    ]


}

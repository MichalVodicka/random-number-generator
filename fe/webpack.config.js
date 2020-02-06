const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
var dotenv = require('dotenv').config({path: __dirname + '/.env'});
const { BACKEND_COOKIE_DOMAIN, BACKEND_URL, BACKEND_PORT, PORT }=dotenv.parsed
module.exports = {
    mode: 'production',
    entry: './src/index.js',

    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/',
        filename: 'index.js',
    },
    devtool: 'source-map',
    devServer: {
        contentBase: './src',
        port:PORT,
        proxy: {
            "/api/*": {
                "changeOrigin": true,
                "cookieDomainRewrite": BACKEND_COOKIE_DOMAIN,
                "target":  BACKEND_URL+':' + BACKEND_PORT,
                onProxyReq: proxyReq => {
                    if (proxyReq.getHeader('origin')) {
                        proxyReq.setHeader('origin', 'http://localhost');
                    }
                }
            },
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: [/node_modules/],
                use: [
                    'babel-loader?cacheDirectory',

                ],
            },
            {
                test: /\.scss$/,
                exclude: [/node_modules/,],
                use: [
                    { loader: "style-loader" },
                    {
                        loader: "css-loader",
                    },
                    { loader: "sass-loader" },

                ]
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve('./src/index.html'),
        }),
        new webpack.DefinePlugin({
            VERSION: JSON.stringify(require("./package.json").version)
        })
    ],

    target: "web"
};

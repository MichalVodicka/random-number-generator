const webpack = require('webpack');
const path = require('path');

const js = {
    test: /\.js$/,
    use: ['babel-loader'],
};

const serverConfig = {
    target: 'node',
    name: 'server',
    node: {
        __dirname: false,
    },
    entry: {
        index: path.resolve(__dirname, './src/index.js'),
    },
    module: {
        rules: [js],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: './index.js',
    },
    plugins: [
        new webpack.DefinePlugin({
            __SERVER__: 'true',
            __BROWSER__: 'false',
        }),
    ],
};

module.exports = serverConfig;
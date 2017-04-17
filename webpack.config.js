/**
 * Created by swxy on 2017/4/13.
 */

const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './page/basic.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
            }
        ]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
};
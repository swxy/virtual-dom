/**
 * Created by swxy on 2017/4/13.
 */

const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function getEntry() {
    const files = fs.readdirSync('page');
    const entry = {};
    files.forEach((file) => {
        const extname = path.extname(file);
        const name = path.basename(file, extname);
        if (extname === '.js' || extname === '.jsx' || extname === '.tsx' || extname === '.ts') {
            entry[name] = [`./page/${file}`];
        }
    });
    return entry;
}

function getHtml() {
    const entry = getEntry();
    return Object.keys(entry).map((key) => {
        let template = 'page/' + key + '.html';
        if (!fs.existsSync(template)) {
            template = 'page/template.html';
        }
        return new HtmlWebpackPlugin({
            title: key + ' demo',
            filename: key + '.html',
            template: template,
            chunks: [key]
        })
    })
}

module.exports = {
    entry: getEntry(),
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    stats: {
        colors: true
    },
    plugins: [].concat(getHtml()),
    devtool: 'inline-source-map'
};
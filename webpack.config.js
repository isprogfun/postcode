const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'app/scripts/main.jsx'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.min.js'
    },
    devtool: 'eval',
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }],
        plugins: [
            new webpack.optimize.UglifyJsPlugin({ minimize: true })
        ]
    }
};

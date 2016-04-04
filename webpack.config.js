var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'app/scripts/main.jsx'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.min.js'
    },
    devtool: 'source-map',
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loaders: ['babel-loader']
        }],
        plugins: [
            new webpack.optimize.UglifyJsPlugin({ minimize: true })
        ]
    }
};

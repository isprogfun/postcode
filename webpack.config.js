var webpack = require('webpack');

module.exports = {
    entry: __dirname + '/app/scripts/main.jsx',
    devtool: 'source-map',
    output: {
        path: __dirname + '/app/',
        filename: 'bundle.min.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ['babel-loader']
            }
        ],
        plugins: [
            new webpack.optimize.UglifyJsPlugin({ minimize: true })
        ]
    }
};

module.exports = {
    entry: __dirname + '/app/scripts/main.jsx',
    output: {
        path: __dirname + '/app/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.jsx$/, loader: 'jsx-loader' }
        ]
    }
};

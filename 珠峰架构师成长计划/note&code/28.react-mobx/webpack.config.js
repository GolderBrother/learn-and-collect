const path = require('path');
module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, './code.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env', 'react', 'stage-0'],
                    plugins: ['transform-decorators-legacy']
                }
            }
        }]
    },
    devtool: 'inline-source-map'
}
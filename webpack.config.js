const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {

    target: 'electron-renderer',

    entry: './src/renderer_process/app/entry.js',

    output: {
        path: __dirname + '/src/renderer_process/build',
        publicPath: 'build/',
        filename: 'bundle.js'
    },

    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.jsx?$/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    use: 'css-loader'
                })
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                query: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },

    plugins: [
        new ExtractTextPlugin({
            filename: 'bundle.css'
        })
    ]

}

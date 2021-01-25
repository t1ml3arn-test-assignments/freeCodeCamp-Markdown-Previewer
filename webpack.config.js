const path = require("path")
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, './src/index.jsx'),
    mode: "development",
    module:{
        rules: [
            {
                // Set-up for babel module.
                // This module allows transpilling JS with Babel and Webpack
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    },
    resolve: {
        // using this allow to leave off extension when importing
        // e.g import Foo from "./Bar"
        extensions: ['*', ".js", ".jsx"]
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename:   'bundle.js',
    },
    devServer: {
        // this option tells dev server to watch
        // "./dist" folder, so the updates of html
        // (or any other file) allso triggers reloading
        watchContentBase: true,
        contentBase: path.resolve(__dirname, './dist'),
        port: 3000,
        // please note at the time of making this config
        // watch option work only for *.js files
        // but not for *.html or any other
        watchOptions: { 
            poll: 2000 ,
            aggregateTimeout: 300,
        },
    },
    plugins: [new ESLintPlugin({
        // without explicit option, jsx files won't be checked
        extensions: ['js', 'jsx'],
    })]
}

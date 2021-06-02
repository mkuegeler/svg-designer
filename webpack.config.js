const path = require('path');
const nodeExternals = require('webpack-node-externals');

const {
    NODE_ENV = 'production',
} = process.env;
module.exports = {
    externals: [nodeExternals()],
    entry: "./src/main.ts",
    mode: NODE_ENV,
    target: 'node',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    resolve: {
        extensions: ['.ts', 'tsx', '.js'],
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: /node_modules/
        }]
    }
}
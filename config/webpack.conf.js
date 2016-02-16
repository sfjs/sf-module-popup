var path = require('path');
var pkg = require('../package.json');
var webpack = require('webpack');

var BANNER =
    'Popup module v.'+pkg.version+'\n' +
    'https://github.com/sfjs/sf-module-autocomplete/\n' +
    'Copyright (c) 2016, Yauheni Yasinau, spiralscout.com';

var bannerPlugin = new webpack.BannerPlugin(BANNER);
var uglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
    include: /\.min\.js$/,
    minimize: true,
    compress: {
        warnings: false
    }
});

module.exports = {
    entry: {
        "sf.popup": './src/index.js',
        "sf.popup.min": './src/index.js'
    },
    output: {
        filename: '[name].js',
        libraryTarget: 'umd',
        path: path.resolve(__dirname, '..', 'dist/')
    },
    resolve: {
        alias: {
            'sf': path.resolve(__dirname, '..', 'node_modules/sf/src/sf')
        },
        extensions: ['', '.js']
    },
    resolveLoader: {
        root: path.resolve(__dirname, '..', 'node_modules')
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                loader: 'babel?presets[]=es2015&plugins[]=transform-runtime',
                exclude: /node_modules/
            }
        ],
        noParse: []
    },
    devtool: 'source-map',
    plugins: [bannerPlugin, uglifyJsPlugin],
    externals: {
        "sf": "sf"
    }
};

var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var UglifyJsPlugin = require("webpack/lib/optimize/UglifyJsPlugin");

module.exports = {
	entry: {
		//'style': __dirname + '/app/styles/ui.less',
		'index': __dirname + '/app/index.js',
		'vender': ['react', 'react-immutable-render-mixin','react-dom', 'redux', 'react-redux']
	},
	output: {
		path: __dirname + '/build',
		filename: 'scripts/[name].js',
		sourceMapFilename: 'scripts/[name].map'
	},
	//devtool: 'source-map',
	module: {
		loaders: [{
			test: /\.jsx?$/,
			exclude: /(node_modules|bower_components)/,
			loader: 'babel-loader',
			query: {
				presets: ['react', 'es2015', 'stage-0']
			}
		}, /*{
			test: /\.jsx?$/,
			include: './app',
			loaders: 'react-hot'
		},*/ {
			test: /\.css$/,
			//loader: ExtractTextPlugin.extract("style-loader","css-loader")
			loader: 'style!css'
		}, {
			test: /\.less$/,
			loader: ExtractTextPlugin.extract("style-loader","css-loader?sourceMap")
			//loader: 'style!css!less'
		}, {
			test: /\.(png|jpg)$/,
			loader: 'url?limit=25000'
		}]
	},
	plugins:  [
    	new CommonsChunkPlugin('scripts/common.js', ['index', 'vender']),
    	new ExtractTextPlugin('styles/[name].css'),
    	//new UglifyJsPlugin(),
		new HtmlWebpackPlugin({
            filename: __dirname + '/build/index.html',
            template: __dirname + '/app/tpl/index.html',
            chunks:['scripts/common.js', 'index']   // 这个模板对应上面那个节点
        })
	]
};
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var UglifyJsPlugin = require("webpack/lib/optimize/UglifyJsPlugin");

var BrowserSyncPlugin = require('browser-sync-webpack-plugin'); 

var argv = process.argv;

var isDev = argv.indexOf('--dev') === -1 ? false : true;
var afterfix = isDev ? '.js' : '.min.js';

console.log('isDev:' + isDev);

var plugins = [
	new CommonsChunkPlugin('scripts/common' + afterfix, ['index', 'vender']),
	new ExtractTextPlugin('styles/[name].css'),
	new HtmlWebpackPlugin({
		filename: __dirname + '/build/index.html',
		template: __dirname + '/app/tpl/index.html',
		chunks: ['scripts/common' + afterfix, 'index'] // 这个模板对应上面那个节点
	}),
	new BrowserSyncPlugin({  
		// browse to http://localhost:3000/ during development
		host: '0.0.0.0',
		port: 3000, //代理后访问的端口
		proxy: 'localhost:8080',//要代理的端口
	}, {
		// prevent BrowserSync from reloading the page
        // and let Webpack Dev Server take care of this
		reload: true
	})
];

if (!isDev) {
	plugins.push(new UglifyJsPlugin({
		minimize: true
	}));
}


module.exports = {
	entry: {
		//'style': __dirname + '/app/styles/ui.less',
		'index': __dirname + '/app/index.js',
		'vender': ['react', 'react-immutable-render-mixin', 'react-dom', 'redux', 'react-redux']
	},
	output: {
		path: __dirname + '/build',
		filename: 'scripts/[name]' + afterfix,
		sourceMapFilename: 'scripts/[name].map'
	},
	devServer: {
    	contentBase: "./build",
    	inline: true
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
		},{
			test: /\.css$/,
			//loader: ExtractTextPlugin.extract("style-loader","css-loader")
			loader: 'style!css'
		}, {
			test: /\.less$/,
			loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap")
				//loader: 'style!css!less'
		}, {
			test: /\.(png|jpg)$/,
			loader: 'url?limit=25000'
		}]
	},
	plugins: plugins
};
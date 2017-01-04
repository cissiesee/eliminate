var path = require('path');

module.exports = {
	entry: './app/index.js',
	output: {
		path: './build',
		filename: 'bundle.js',
		sourceMapFilename: 'index.map'
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
			loader: 'style!css'
		}, {
			test: /\.less$/,
			loader: 'style!css!less'
		}, {
			test: /\.(png|jpg)$/,
			loader: 'url?limit=25000'
		}]
	}
};
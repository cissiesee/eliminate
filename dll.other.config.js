const webpack = require('webpack');
const path = require('path');

const vendors = ['faker', 'immutable'];
const exportPath = './build/lib';

module.exports = {
	output: {
		path: path.resolve( __dirname, exportPath),
		filename: '[name].js',
		library: '[name]'
	},
	entry: {
		"other": vendors
	},
	plugins: [
		new webpack.DllPlugin({
			path: path.resolve( __dirname, exportPath + '/manifest-other.json'),
			name: '[name]',
			context: __dirname
		})
	],
};
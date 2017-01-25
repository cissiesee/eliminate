const webpack = require('webpack');
const path = require('path');

const vendors = ['redux', 'redux-thunk', 'react-redux'];
const exportPath = './build/lib';

module.exports = {
	output: {
		path: path.resolve( __dirname, exportPath),
		filename: '[name].js',
		library: '[name]'
	},
	entry: {
		"reduxRel": vendors,
	},
	plugins: [
		new webpack.DllPlugin({
			path: path.resolve( __dirname, exportPath + '/manifest-redux.json'),
			name: '[name]',
			context: __dirname
		})
	],
};
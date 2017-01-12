// http://webpack.github.io/docs/configuration.html
// http://webpack.github.io/docs/webpack-dev-server.html
var app_root = 'src'; // the app root folder
var path = require('path');
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	app_root: app_root, // the app root folder, needed by the other webpack configs
	entry: [
		// http://gaearon.github.io/react-hot-loader/getstarted/
		'webpack-dev-server/client?http://'+require("os").hostname()+':8080/',
		'webpack/hot/only-dev-server',
		'babel-polyfill',
		__dirname + '/' + app_root + '/index.js',
	],
	output: {
		path: __dirname + '/public/js',
		publicPath: 'js/',
		filename: 'bundle.js',
	},
	eslint: {
		emitWarnings: false,
	},
	module: {
		preLoaders: [
			{
				test: /\.js$/,
				loaders: ["eslint-loader"],
				exclude: /node_modules/
			}
		],
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel',
				exclude: /node_modules/,
			},
			{
				// https://github.com/jtangelder/sass-loader
				test: /\.scss$/,
				loaders: ['style', 'css', 'sass'],
			},
			{
				test: /\.gif$/,
				loader: "url-loader?mimetype=image/png",
			},
			{
				test: /\.less$/,
				loader: "style-loader!css-loader!less-loader",
			},
			{
				test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/,
				loader: "url-loader?mimetype=application/font-woff",
			},
			{
				test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/,
				loader: "file-loader?name=[name].[ext]",
			},
			{
				test: /\.css$/,
				loaders: ['style', 'css'],
			}
		],
	},
	devServer: {
		contentBase: __dirname + '/public',
	},
	plugins: [
		new CleanWebpackPlugin(['css/main.css', 'js/bundle.js'], {
			root: __dirname + '/public',
			verbose: true,
			dry: false, // true for simulation
		}),
	],
};

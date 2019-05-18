const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let config = {
	entry: "./src/index.ts",
	output: {
		path: path.resolve(__dirname, "./public"),
		filename: "./bundle.js"
	},
	resolve: {
		extensions: ['.ts', '.js']
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: "babel-loader"
			},
			{
				test: /\.scss$/,
				use: ['css-hot-loader', MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader', 'postcss-loader']
			},
			{
				test: /\.ts$/,
				use: 'ts-loader',
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.(png|jpg|woff|woff2|eot|ttf|svg)$/,
				loader: 'url-loader?limit=100000'
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			favicon: 'assets/icons/logo.ico'
		}),
		new MiniCssExtractPlugin()
	],
	devServer: {
		contentBase: path.resolve(__dirname, "./public"),
		historyApiFallback: true,
		inline: true,
		open: true,
		hot: true
	},
	devtool: "inline-source-map"
}

module.exports = config;

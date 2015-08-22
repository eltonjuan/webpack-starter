module.exports = {
	entry: {
		app: ['webpack/hot/dev-server', './src/app.js']
	},
	output: {
		path: require('path').resolve('./dist'),
		publicPath: '/dist/'
	},
	plugins: [],
	devServer: {
		hot: true
	},
	module: {
		loaders: [
			{
				test: /\.js?$/,
				exclude: /node_modules/,
				loader: 'babel'
			}
		]
	}
}
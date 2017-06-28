var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin"); //para separar os arquivos que serão chamados separadamente
var extractCss = new ExtractTextPlugin('css/app.css');
module.exports = {
	entry: './src/js/main.js',
	output: {
		path: __dirname + '/dist',
		filename: 'app.bundle.js',
		publicPath: '/dist/'
	},
    plugins:[
        new webpack.ProvidePlugin({
            'window.$': 'jquery',
            'window.JQuery' : 'jquery'
        }),
        extractCss,
        new webpack.HotModuleReplacementPlugin()
    ],
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel'
			},
			{
				test: /\.(woff|woff2|ttf|svg|eot)$/,
				loader: 'url?limit=50000'
			},
			{
				test: /\.scss$/,
				loader: extractCss.extract(['css','sass'])
			},
			{
				test: /\.vue$/,
				loader: 'vue'
			}
		]
	},
    devtool: 'source-map',
    devServer: {
	    host: '0.0.0.0',
        disableHostCheck: true,
        inline: true,
        watchOptions: {
	        poll: true,
            aggregateTimeout: 500
        }
    }
}
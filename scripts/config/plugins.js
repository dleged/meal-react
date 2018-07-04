const paths = require('./paths');
const webpack = require('webpack');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let withProductionEnv = process.env.NODE_ENV === 'production' ? true : false;

 let HtmlWebpackPlugins = [];
 paths.appHtmlList.forEach((item)=>{
     HtmlWebpackPlugins.push(
         new HtmlWebpackPlugin({
             inject: true,
             template: item.path,
             filename: `${item.name}.html`,
						//  minify: {
						// 		removeComments: true,
						// 		collapseWhitespace: true,
						// 		removeRedundantAttributes: true,
						// 		useShortDoctype: true,
						// 		removeEmptyAttributes: true,
						// 		removeStyleLinkTypeAttributes: true,
						// 		keepClosingSlash: true,
						// 		minifyJS: true,
						// 		minifyCSS: true,
						// 		minifyURLs: true,
						// }
         })
     );
 });

module.exports = (plugins) => {
	let setPlugins = HtmlWebpackPlugins.concat([
		new webpack.optimize.SplitChunksPlugin({//通过将公共模块拆出来，最终合成的文件能够在最开始的时候加载一次，便存到缓存中供后续使用
			name: "commons",
	    filename: 'commons[hash:8].js',
		}),
		//在合并 chunk 时，webpack 会尝试识别出具有重复模块的 chunk，并优先进行合并。任何模块都不会被合并到 entry chunk 中，以免影响初始页面加载时间
		new webpack.optimize.LimitChunkCountPlugin({
		  maxChunks: 5,
		  minChunkSize: 1000
		}),
    new CaseSensitivePathsPlugin(),
    new ExtractTextWebpackPlugin({
      filename: '[name]_[hash:8].css',
      allChunks: true,
    })
	])
	setPlugins = plugins ? deepAssign({},setPlugins) : setPlugins;

	return setPlugins;
}

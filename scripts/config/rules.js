const path = require('path');
const fs = require('fs');
const autoprefixer = require('autoprefixer');
const paths = require('./paths');
// const BABEL_LOADER = require.resolve('babel-loader');
// const REACT = require.resolve('react');
// const SASS_LOADER = require.resolve('sass-loader');
// const LESS_LOADER = require.resolve('less-loader');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const STYLE_LOADER = require.resove('style-loader');
// const CSS_LOADER = require.resove('css-loader');
const sourceMap = {sourceMap: true};

function withCssHotLoader(loaders){
	if(process.env.NODE_ENV != 'production'){
		return [LOADERS['CSS_HOT_LOADER']].concat(loaders);
	}
	return loasers;
}

function withPostcss(){
	let postcss = {
		plugins: [
	    autoprefixer({
	      browsers: [
	        'last 2 versions',
	        'Firefox ESR',
	        '> 1%',
	        'ie >= 9',
	        'iOS >= 8',
	        'Android >= 4',
	      ]
	    })
	  ]
	}
	let cwd = process.cwd();
	console.log(path)
	let babelrcFilePath = path.resolve(cwd,'postcss.config.js');
	if(fs.existsSync(babelrcFilePath)){
		postcss = requlre(babelrcFilePath);
	}
	return postcss;
}


//引入reules 默认loader
const loaderArray = ['babel-loader','sass-loader','less-loader','postcss-loader'
			,'css-loader','css-hot-loader','url-loader']
let LOADERS = (function(loaderArray){
	let loadersJson = {};
	loaderArray.forEach((loader) => {
			loadersJson[loader.replace(/-/g,'_').toLocaleUpperCase()] = require.resolve(loader);
	})
	return loadersJson;
})(loaderArray)

module.exports = (rules) => {
	let setRules = [
		{
			test: /\.(scss|sass)$/,
			include: paths.appDirectory,
			use: withCssHotLoader([
				{
					loader: LOADERS['CSS_LOADER'],
					options: {
						sourceMap
					}
				},
				{
					loader: LOADERS['POSTCSS_LOADER'],
					options: Object.assign(sourceMap,withPostcss())
				},
				{
					loader: LOADERS['SASS_LOADER'],
					options: {
						sourceMap
					}
				}
			])
		},
		{
			test: /\.less$/,
			include: paths.appDirectory,
			use: withCssHotLoader([
					{
						loader: LOADERS['CSS_LOADER'],
						options: {
							sourceMap
						}
					},
					{
						loader: LOADERS['POSTCSS_LOADER'],
						options: Object.assign(sourceMap,withPostcss())
					},
					{
						loader: LOADERS['LESS_LOADER'],
						options: {
							sourceMap
						}
					}
				])
		},
		{
			test: /\.css$/,
			include: paths.appDirectory,
			use: withCssHotLoader([
				{
					loader: LOADERS['CSS_LOADER'],
					options: {
						sourceMap
					}
				},
				{
					loader: LOADERS['POSTCSS_LOADER'],
					options: Object.assign(sourceMap,withPostcss())
				}
			])
		}
	]
	rules = rules ? Object.assign({},setRules) : setRules;
	return rules;
}

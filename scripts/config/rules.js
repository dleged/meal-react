const path = require('path');
const fs = require('fs');
const autoprefixer = require('autoprefixer');
const paths = require('./paths');
const deepAssign = require('deep-assign');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const URL_LOADER_LIMIT = 1111118192;


function withCssHotLoader(loaders){
	if(process.env.NODE_ENV != 'production'){
		return [LOADERS['CSS_HOT_LOADER']].concat(loaders);
	}
	return loasers;
}

function withPostcss(){
	let postcss = {
		plugins: [
        require('precss'),
        require('autoprefixer')
    ]
	}
	let cwd = process.cwd();
	let postcssFilePath = path.resolve(cwd,'postcss.config.js');
	if(fs.existsSync(postcssFilePath)){
		postcss = requlre(postcssFilePath);
	}
	return postcss;
}


//引入reules 默认loader
const loaderArray = ['html-loader','babel-loader','sass-loader','less-loader','postcss-loader'
			,'css-loader','css-hot-loader','url-loader','style-loader']
let LOADERS = (function(loaderArray){
	let loadersJson = {};
	loaderArray.forEach((loader) => {
			loadersJson[loader.replace(/-/g,'_').toLocaleUpperCase()] = require.resolve(loader);
	})
	return loadersJson;
})(loaderArray)

module.exports = () => {
	let setRules = [
		{
		  test: /\.(html|htm)$/,
		  use: {
		    loader: LOADERS['HTML_LOADER'],
		    options: {
		      attrs: [':data-src']
		    }
		  }
		},
		{
			test: /\.(scss|sass)$/,
			include: paths.appSrc,
			use: withCssHotLoader([
			MiniCssExtractPlugin.loader,
				{
					loader: LOADERS['CSS_LOADER'],
					options: {
						sourceMap: true
					}
				},
				{
					loader: LOADERS['POSTCSS_LOADER'],
					options: Object.assign({sourceMap: true},withPostcss())
				},
				{
					loader: LOADERS['SASS_LOADER'],
					options: {
						sourceMap: true,
						modules: true,
       			localIdentName: '[path][name]__[local]--[hash:base64:5]'
					}
				}
			])
		},
		{
			test: /\.less$/,
			include: paths.appSrc,
			use: withCssHotLoader([
					MiniCssExtractPlugin.loader,
					{
						loader: LOADERS['CSS_LOADER']
					},
					{
						loader: LOADERS['POSTCSS_LOADER'],
						options: Object.assign({sourceMap: true},withPostcss())
					},
					{
						loader: LOADERS['LESS_LOADER'],
						options: {
							sourceMap: true,
							modules: true
						}
					}
				])
		},
    {
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader:  LOADERS['CSS_LOADER'],
          options: {
            sourceMap: true,
            importLoaders: 1,
          },
        },
      ],
    },
		{
			test: /\.(js|jsx|ts)$/,
		  enforce: 'pre',
			include: paths.appSrc,
			exclude: paths.appNodeModules,
			use: {
        loader: LOADERS['BABEL_LOADER']
			}
		},
		// extra url loader usage
    {
      test: /\.woff2?$/,
      loader: LOADERS['URL_LOADER'],
      options: {
        limit: URL_LOADER_LIMIT,
        minetype: 'application/font-woff',
        name: 'static/assets/[hash:4].[ext]',
      },
    },
    {
      test: /\.ttf$/,
      loader: LOADERS['URL_LOADER'],
      options: {
        limit: URL_LOADER_LIMIT,
        minetype: 'application/octet-stream',
        name: 'static/assets/[hash:4].[ext]',
      },
    },
    {
      test: /\.eot$/,
      loader: LOADERS['URL_LOADER'],
      options: {
        limit: URL_LOADER_LIMIT,
        minetype: 'application/vnd.ms-fontobject',
        name: 'static/assets/[hash:4].[ext]',
      },
    },
    {
      test: /\.svg$/,
      loader: LOADERS['URL_LOADER'],
      options: {
        limit: URL_LOADER_LIMIT,
        minetype: 'image/svg+xml',
        name: 'static/assets/[hash:4].[ext]',
      },
    },
    {
      test: /\.(png|jpg|jpeg|gif)$/i,
      loader: LOADERS['URL_LOADER'],
      options: {
        limit: URL_LOADER_LIMIT,
        name: 'static/assets/[hash:4].[ext]',
      },
    }
	]
	return setRules;
}

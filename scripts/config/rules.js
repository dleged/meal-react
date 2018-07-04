const path = require('path');
const fs = require('fs');
const autoprefixer = require('autoprefixer');
const paths = require('./paths');
const deepAssign = require('deep-assign');
const URL_LOADER_LIMIT = 8192;

function getBabelConfig(){
	let babelConfig = {
		presets: [
			require.resolve('@babel/preset-env'),
			{
				targets: {
					browsers: [
						'last 2 versions',
						'Firefox ESR',
						'> 1%',
						'ie >= 9',
						'iOS >= 8',
						'Android >= 4',
					],
				}
			},
			require.resolve('@babel/preset-react'),
      [require.resolve('@babel/preset-stage-0'), {options: {decoratorsLegacy: true }}],
		],
		dev: {
			development: {
				plugins: [
	        require.resolve('@babel/plugin-transform-runtime'),
	        {
	          helpers: false,
	          polyfill: true,
	          regenerator: true,
	          moduleName: 'babel-runtime'
	        }
				]
			},
			production: {
				plugins: [
					require.resolve('babel-plugin-transform-es2015-object-super'),
		      [require.resolve('@babel/plugin-proposal-decorators'), { legacy: true }],
		      [
		        require.resolve('@babel/plugin-proposal-class-properties'),
		        { loose: true },
		      ],
		      [
		        require.resolve('@babel/plugin-transform-runtime'),
		        {
		          polyfill: true,
		          regenerator: true,
		          moduleName: 'babel-runtime',
		        },
		      ]
				]
			}
		}
	}

	let cwd = process.cwd();
	let babelrcFilePath = path.resolve(cwd,'.babelrc');
	if(fs.existsSync(babelrcFilePath)){
		babelConfig = require(babelrcFilePath);
	}
	return babelConfig;
}

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
			use: withCssHotLoader([
				LOADERS['STYLE_LOADER'],
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
						sourceMap: true
					}
				}
			])
		},
		{
			test: /\.less$/,
			use: withCssHotLoader([
					LOADERS['STYLE_LOADER'],
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
						loader: LOADERS['LESS_LOADER'],
						options: {
							sourceMap: true
						}
					}
				])
		},
    {
      test: /\.css$/,
      use: [
        LOADERS['STYLE_LOADER'],
        //require.resolve('style-loader'),
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
        name: 'static/assets/[hash].[ext]',
      },
    },
    {
      test: /\.ttf$/,
      loader: LOADERS['URL_LOADER'],
      options: {
        limit: URL_LOADER_LIMIT,
        minetype: 'application/octet-stream',
        name: 'static/assets/[hash].[ext]',
      },
    },
    {
      test: /\.eot$/,
      loader: LOADERS['URL_LOADER'],
      options: {
        limit: URL_LOADER_LIMIT,
        minetype: 'application/vnd.ms-fontobject',
        name: 'static/assets/[hash].[ext]',
      },
    },
    {
      test: /\.svg$/,
      loader: LOADERS['URL_LOADER'],
      options: {
        limit: URL_LOADER_LIMIT,
        minetype: 'image/svg+xml',
        name: 'static/assets/[hash].[ext]',
      },
    },
    {
      test: /\.(png|jpg|jpeg|gif)$/i,
      loader: LOADERS['URL_LOADER'],
      options: {
        limit: URL_LOADER_LIMIT,
        name: 'static/assets/[hash].[ext]',
      },
    }
	]
	return setRules;
}

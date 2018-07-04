/**
 * 所有路径相关配置依赖
 */

'user strict';

const {realpathSync,readdirSync,statSync} = require('fs');
const {resolve,join} = require('path');
const chalk = require('chalk');
const fs = require('fs');
const appRootDirectory = realpathSync(process.cwd());

function resolvePath(relativePath){
	return resolve(appRootDirectory,relativePath);
}

//1⃣️可在public中添加多个html(多页面)
//2⃣️可在html名字会与src/pages下(js|jsx|ts)后缀的文件严格匹配，作文页面的主入口文件
let appHtmlList = chunkList(resolvePath('public'),"(.+)\\.+(html|htm)$");
/**
 *@return [Array]
 *[
 * {name: 'index', path: ${File absolute path} },{'index2': File absolute path }, ...
 * ]
 * 但是在src下存在默认的index.js 为主要页面(可作为单页面和多页面首页)
 */
let appJsList = [{name: 'index',path: resolve(process.cwd(),'src/index.js')}]
								.concat(chunkList(resolvePath('src/pages'),"(.+)\\.+(js|jsx|ts)$"));

function chunkList(path,pattern){
		let fileResults = [];
		let files = readdirSync(path);//读取path路径下的文件夹和文件;
		let reg = new RegExp(pattern);
		files.forEach(fileName => {
			//如果是文件夹，则继续递归遍历；
			let filePath = join(path,fileName);
			let stat = statSync(filePath);
			if(fileName.match(reg)){
				fileResults.push({
					name: fileName.replace(/\..+$/,''),
					path: `${path}/${fileName}`
				});
			}else if(stat.isDirectory()){
				fileResults = fileResults.concat(chunkList(filePath,pattern));
			}
		})
	return fileResults;
}

const getPublicPath = appPackageJson =>{
	let webpackrc = fs.existsSync(appPackageJson) && require(appPackageJson).webpackrc;
	let publicPath;

	if(webpackrc && webpackrc.publicPath){
		publicPath = webpackrc.publicPath;
		if(!publicPath.endWith('/')){
			 publicPath = publicPath + '/';
		}
	}else{
		publicPath = '/'
	}
	return publicPath;
};

module.exports = {
	appRootDirectory,
	appPublic: resolvePath('public'),
	appSrc: resolvePath('src'),
	appBuild: resolvePath('dist'),
	appHtmlList,
	appJsList,
  appPackageJson: resolvePath('package.json'),
	yarnLockFile: resolvePath('yarn.lock'),
  appNodeModules: resolvePath('node_modules'),
  publicPath: getPublicPath(resolvePath('package.json')),//上线资源地址{dev: ...,pro: ...}
};

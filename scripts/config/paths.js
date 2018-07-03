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

let appHtmlList = chunkList(resolvePath('public'),"(.+)\\.+(html|htm)$");//多页面
let appJsList = chunkList(resolvePath('src/pages'),"(.+)\\.+(js|jsx|ts)$");

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

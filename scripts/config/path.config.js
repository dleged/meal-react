/**
 * 所有路径相关配置依赖
 */

'user strict';

const {realpathSync,readdirSync,statSync} = require('fs');
const {resolve,join} = require('path');
const chalk = require('chalk');
const appDirectory = realpathSync(process.cwd());

function resolvePath(relativePath){
	return resolve(appDirectory,relativePath);
}

let appHtmlList = chunkList(resolvePath('public'),"(.+)\\.+(html|htm)$");
let appJsList = chunkList(resolvePath('src/pages'),"(.+)\\.+(js|jsx)$");

function chunkList(path,pattern){
		let fileResults = [];
		let files = readdirSync(path);//读取path路径下的文件夹和文件;
		let reg = new RegExp(pattern);
		files.forEach(fileName => {
			//如果是文件夹，则继续递归遍历；
			let filePath = join(path,fileName);
			let stat = statSync(filePath);
			console.log(stat)
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

const envPublicUrl = process.env.PUBLIC_URL;
const getPublicUrl = appPackageJson => envPublicUrl || require(appPackageJson).homepage || "/";

module.exports = {
	appDirectory,
	appPublic: resolvePath('public'),
	appSrc: resolvePath('src'),
	appBuild: resolvePath('dist'),
	appHtmlList,
	appJsList,
  appPackageJson: resolvePath('package.json'),
	yarnLockFile: resolvePath('yarn.lock'),
  appNodeModules: resolvePath('node_modules'),
  publicUrl: getPublicUrl(resolvePath('package.json'))
};

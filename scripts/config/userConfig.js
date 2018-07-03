const path = require('path');
const chalk = require('chalk');

module.exports = function exitsWebpackrc(path = 'webpackrc.js'){
	let cwd =  process.cwd();
	let webpackrcFilePath = path.resolve(cwd,path);
	console.log(chalk.blue(`⚙️ loading ${path} 用户自定义配置文件`));
	if(path.existsSync(webpackrcFilePath)){
		return require(webpackrcFilePath);
	}else{
		return null;
	}
}

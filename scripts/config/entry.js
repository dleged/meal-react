'user strict';

const paths = require('./paths');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

let entry = {};
paths.appJsList.forEach((item)=>{
   entry[item.name] = [
       require.resolve('./polyfills'),
       item.path
   ];
});

module.exports = () => {
	let cwd = process.cwd();
	let pckDirectory = fs.realpathSync(cwd);
	let pckFilePath = path.resolve(pckDirectory,'package.json');
	let pckJson = require(pckFilePath);
	let webpackrc = pckJson.webpackrc || null;
	if(webpackrc && webpackrc.entry){
		console.log(chalk.blue('加载 package.json中的配置entry'));
		entry = webpackrc.entry;
	}
	return entry;
}

'user strict';

const paths = require('./paths');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

module.exports = (cwd) => {
	cwd = cwd || process.cwd();
	let pckDirectory = fs.realpathSync(cwd);
	let pckFilePath = path.resolve(pckDirectory,'package.json');
	let pckJson = require(pckFilePath);
	let webpackrc;
	if(webpackrc = pckJson.webpackrc){
		let entry;
		if(webpackrc && webpackrc.entry){
			console.log('加载 package.json中的配置entry');
			return entry = webpackrc.entry;
		}
	}
}

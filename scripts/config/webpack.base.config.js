const path = require('paths');
const entry = require('./entry');
const rules = require('./rules');
const plugins = require('./plugins');
const userConfig = require('./userConfig');
const paths = require('./paths');
const deepAssign = require('deep-assign');

let setings = {};
let output = {
	 path: paths.appBuild,
	 filename: '/static/js/[name_hash:8].js',
	 // filename: function(){
		//  return '/static/js/[name_hash:8].js'
	 // }
	 chunkFilename: 'static/js/[name].chunk.js'
};
let modules = {
	rules: rules
};
let resolve = {
	extensions: ['.js', '.json', '.jsx', '.css','.less','sass'],
	alias: {
		'@componments': `${path.appRootDirectory}/src/components`,
    '@common': `${config.appRootDirectory}/src/common`,
    '@utils': `${config.appRootDirectory}/src/utils`,
    '@assets': `${config.appRootDirectory}/src/assets`,
    '@root': __dirname,
	}
}

module.exports = {
 context: paths.appSrc,
	entry,
	output,
	modules,
	plugins,

}

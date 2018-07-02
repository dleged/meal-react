// const path = require('./config/paths');
const fs = require('fs');
const path = require('path');
const result = require('./config/entry')();


fs.writeFileSync(path.resolve(__dirname,'result.js'),JSON.stringify(result));

var path=require('path');

var file=path.resolve(__dirname,'dev.js');
console.log(file);
var config=module.exports=require(file);
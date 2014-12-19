getFile();
function getFile(){
	var fs = require('fs');
	var request = require('request');
	request('http://www.who.int/entity/healthinfo/global_burden_disease/GHE_DthGlobal_2000_2012.xls').pipe(fs.createWriteStream('file.xls'));
}
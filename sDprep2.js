toJson();
function toJson(){
	var xls_json = require('xls-to-json');
	xls_json({
	  input: 'file.xls',
	  output: 'testna1.json',
	  sheet: "Summary"
	}, function(err, result) {
	  if(err) {
		console.error(err);
	  } else {
		console.log(result);
	  }
	});
}
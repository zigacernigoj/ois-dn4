function getData(){
/*
$.ajax({
			url: 'testna1.json',
	    	success: function (data) {
				$("#data").html(JSON.stringify(data));
				console.log(data);
			},
			error: function(err) {
				$("#data").html(JSON.parse(err.responseText).userMessage);
				console.log(JSON.parse(err.responseText).userMessage);
			}
		});*/
		
		
	$.getJSON("testna1.json", function(data){
	  alert("deluje!");
	  $("#data").html(JSON.stringify(data));
	});	
		
		

}
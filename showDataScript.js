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
	  //alert("deluje!");
	  var results = "<table class='table table-striped table-hover'><tr><th>code</th><th>main</th><th>sub1</th><th>sub2</th><th>sub3</th><th>deaths (2012)</th></tr>";
	  for (var i in data){
		results += "<tr><td>" + data[i].code + "</td><td>" + data[i].main +"</td><td>" + data[i].sub1 + "</td><td>" + data[i].sub2 +"</td><td>" + data[i].sub3 +"</td><td>" +  data[i].Deaths2012 +"</td></tr>";
	  }
	   results += "</table>";
	  $("#data1").append(results);
	  $("#data1").append(JSON.stringify(data));
	});	
		
	//$("#data2").html(JSON.stringify(data));	

}
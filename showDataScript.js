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
	});
*/
	var mainCat, sub1Cat, sub2Cat, sub3Cat;
	
		
	$.getJSON("testna1.json", function(data){
	  //alert("deluje!");
	  var results = "<table class='table table-striped table-hover'><tr><th>code</th><th>main</th><th>sub1</th><th>sub2</th><th>sub3</th><th>deaths (2012)</th></tr>";
	  var j=0, k=0, l=0, m=0;
	  for (var i in data){
		results += "<tr><td>" + data[i].code + "</td><td>" + data[i].main +"</td><td>" + data[i].sub1 + "</td><td>" + data[i].sub2 +"</td><td>" + data[i].sub3 +"</td><td>" +  data[i].Deaths2012 +"</td></tr>";
		if(data[i].main && data[i].main.trim().length>2){
			//mainCat[j]=JSON.stringify(data[i].main);
			$("#data2").append(data[i].code +": "+ data[i].main+ " ; j=" + j + "</br>");
			j++;
		}
		
		if(data[i].sub1 && data[i].sub1.trim().length>2){
			//mainCat[j]=JSON.stringify(data[i].main);
			$("#data2").append(data[i].code +": "+ data[i].sub1+ " ; k=" + k + "</br>");
			k++;
		}
		
		if(data[i].sub2 && data[i].sub2.trim().length>2){
			//mainCat[j]=JSON.stringify(data[i].main);
			$("#data2").append(data[i].code +": "+ data[i].sub2+ " ; l=" + k + "</br>");
			l++;
		}
		
		if(data[i].sub3 && data[i].sub3.trim().length>2){
			//mainCat[j]=JSON.stringify(data[i].main);
			$("#data2").append(data[i].code +": "+ data[i].sub3+ " ; m=" + k + "</br>");
			m++;
		}
		
		
		
	  }
	   results += "</table>";
	  $("#data1").append(results);
	  $("#data1").append(JSON.stringify(data));
	   $("#data2").append(mainCat);
	});	
		
	//$("#data2").html(JSON.stringify(data));	

}
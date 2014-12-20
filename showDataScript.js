var mainCat=new Array(), sub1Cat=new Array(), sub2Cat=new Array(), sub3Cat=new Array();



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

	
		
	$.getJSON("testna1.json", function(data){
	  //alert("deluje!");
	  var results = "<table class='table table-striped table-hover'><tr><th>code</th><th>main</th><th>sub1</th><th>sub2</th><th>sub3</th><th>deaths (2012)</th></tr>";
	  var tabledata2="<table class='table table-striped table-hover'>";
	
	  var select="<option value=''></option>";

	  var j=0, k=0, l=0, m=0;
	  for (var i in data){
		results += "<tr><td>" + data[i].code + "</td><td>" + data[i].main +"</td><td>" + data[i].sub1 + "</td><td>" + data[i].sub2 +"</td><td>" + data[i].sub3 +"</td><td>" +  data[i].Deaths2012 +"</td></tr>";
		tabledata2+="<tr>";
		if(data[i].code>0 && data[i].main && data[i].main.trim().length>3){
			j++;
			mainCat[j]= j + " " + data[i].main;
			//$("#data2").append(data[i].code +": "+ data[i].main+ " ; j=" + j + "</br>");
			tabledata2+="<td>"+mainCat[j]+"</td>";
			select+="<option value='"+mainCat[j]+"'>"+mainCat[j]+"</option>";
			
			
			k=0;
		}
		
		if(data[i].code>0 && data[i].sub1 && data[i].sub1.trim().length>3){
			k++;
			sub1Cat[k]= j + "." + k + " " + data[i].sub1;
			//$("#data2").append(data[i].code +": "+ data[i].sub1+ " ; k=" + k + "</br>");
			tabledata2+="<td>"+sub1Cat[k]+"</td>";
			l=0;
		}
		
		if(data[i].code>0 && data[i].sub2 && data[i].sub2.trim().length>3){
			l++;
			sub2Cat[l]= j + "." + k + "." + l + data[i].sub2;
			//$("#data2").append(data[i].code +": "+ data[i].sub2+ " ; l=" + k + "</br>");
			tabledata2+="<td>"+sub2Cat[l]+"</td>";
			m=0;
		}
		
		if(data[i].code>0 && data[i].sub3 && data[i].sub3.trim().length>3){
			m++;
			sub3Cat[m]= j + "." + k + "." + l + "." + m + data[i].sub3;
			//$("#data2").append(data[i].code +": "+ data[i].sub3+ " ; m=" + k + "</br>");
			tabledata2+="<td>"+sub3Cat[m]+"</td>";
		}
		
		tabledata2+="</tr>";
	  }
	  
	  
	   results += "</table>";
	   tabledata2 += "</table>";
	   
	  $("#data1").append(results);
	  //$("#data1").append(JSON.stringify(data));
	  
		$("#data2").append(tabledata2);
		$("#chooseMain").append(select);
	});	
		
	//$("#data2").html(JSON.stringify(data));	

}


function selectData(){
	var select="<option value=''></option>";

	for (var i in mainCat){
		select+="<option value='"+mainCat[j]+"'>"+mainCat[j]+"</option>";
	}

	$("#chooseMain").append(select);














}










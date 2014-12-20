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
	
	  var selectMain="<option value=''></option>";
	  var selectS1="<option value=''></option>";
	  var selectS2="<option value=''></option>";
	  var selectS3="<option value=''></option>";
	  

	  
	  var j=0, k=0, l=0, m=0;
	  for (var i in data){
		results += "<tr><td>" + data[i].code + "</td><td>" + data[i].main +"</td><td>" + data[i].sub1 + "</td><td>" + data[i].sub2 +"</td><td>" + data[i].sub3 +"</td><td>" +  data[i].Deaths2012 +"</td></tr>";
		tabledata2+="<tr>";
		if(data[i].code>0 && data[i].main && data[i].main.trim().length>3){
			j++;
			mainCat[j]= j + " " + data[i].main;
			//$("#data2").append(data[i].code +": "+ data[i].main+ " ; j=" + j + "</br>");
			tabledata2+="<td>"+mainCat[j]+"</td>";
			selectMain+="<option value='"+mainCat[j]+"'>"+mainCat[j]+"</option>";
			k=0;
		}
		
		if(data[i].code>0 && data[i].sub1 && data[i].sub1.trim().length>3){
			k++;
			sub1Cat[k]= j + "." + k + " " + data[i].sub1;
			//$("#data2").append(data[i].code +": "+ data[i].sub1+ " ; k=" + k + "</br>");
			tabledata2+="<td>"+sub1Cat[k]+"</td>";
			selectS1+="<option value='"+sub1Cat[k]+"'>"+sub1Cat[k]+"</option>";
			l=0;
		}
		
		if(data[i].code>0 && data[i].sub2 && data[i].sub2.trim().length>3){
			l++;
			sub2Cat[l]= j + "." + k + "." + l + " " + data[i].sub2;
			//$("#data2").append(data[i].code +": "+ data[i].sub2+ " ; l=" + k + "</br>");
			tabledata2+="<td>"+sub2Cat[l]+"</td>";
			selectS2+="<option value='"+sub2Cat[l]+"'>"+sub2Cat[l]+"</option>";
			m=0;
		}
		
		if(data[i].code>0 && data[i].sub3 && data[i].sub3.trim().length>3){
			m++;
			sub3Cat[m]= j + "." + k + "." + l + "." + m + " " + data[i].sub3;
			//$("#data2").append(data[i].code +": "+ data[i].sub3+ " ; m=" + k + "</br>");
			tabledata2+="<td>"+sub3Cat[m]+"</td>";
			selectS3+="<option value='"+sub3Cat[m]+"'>"+sub3Cat[m]+"</option>";
		}
		
		tabledata2+="</tr>";
	  }
	  
	   results += "</table>";
	   tabledata2 += "</table>";
	   
	  $("#data1").append(results);
	  //$("#data1").append(JSON.stringify(data));
	  
		$("#data2").append(tabledata2);
		$("#chooseMain").append(selectMain);
		$("#chooseS1").append(selectS1);
		$("#chooseS2").append(selectS2);
		$("#chooseS3").append(selectS3);
	});	
	
	document.getElementById("data1").style.visibility = 'hidden';
	document.getElementById("data2").style.visibility = 'hidden';
	
	//$("#data2").html(JSON.stringify(data));	

}


function toggle(){
	if(document.getElementById("data1").style.visibility == 'hidden'){
		document.getElementById("data1").style.visibility = 'visible';
		document.getElementById("data2").style.visibility = 'visible';
	}
	else{
		document.getElementById("data1").style.visibility = 'hidden';
		document.getElementById("data2").style.visibility = 'hidden';		
	}
}


function selectData(){
	var select="<option value=''></option>";

	for (var i in mainCat){
		select+="<option value='"+mainCat[j]+"'>"+mainCat[j]+"</option>";
	}

	$("#chooseMain").append(select);














}










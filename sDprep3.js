var mainCat=new Array(), sub1Cat=new Array(), sub2Cat=new Array(), sub3Cat=new Array();
getFile();
toGraph();

function getFile(){

	$.getJSON("testna1.json", function(data){
		  var j=0, k=0, l=0, m=0;
		  var k1=0, l1=0, m1=0;
		  
		for (var i in data){
			if(data[i].code>0 && data[i].main && data[i].main.trim().length>3){
				j++;
				mainCat[j]= j + ". " + data[i].main;
				k=0;
			}
			
			if(data[i].code>0 && data[i].sub1 && data[i].sub1.trim().length>3){
				k++;
				k1++;
				sub1Cat[k1]= j + "." + k + ". " + data[i].sub1;
				l=0;
			}
			
			if(data[i].code>0 && data[i].sub2 && data[i].sub2.trim().length>3){
				l++;
				l1++;
				sub2Cat[l1]= j + "." + k + "." + l + ". " + data[i].sub2;
				m=0;
			}
			
			if(data[i].code>0 && data[i].sub3 && data[i].sub3.trim().length>3){
				m++;
				m1++;
				sub3Cat[m1]= j + "." + k + "." + l + "." + m + ". " + data[i].sub3;
			}
		}
	});	
}

function toGraph(){
	
	var jsonString='{ "name":"causes",';
	jsonString+='"children":[';
	for (var i in mainCat){
		jsonString+='{"name":"'+mainCat[i]+'",';
		jsonString+='"children":[';
		
		for (var j in sub1Cat){
			if(mainCat[i].substring(0,1)==sub1Cat[j].substring(0,1)){
				jsonString+='{"name":"'+sub1Cat[j]+'",';
				jsonString+='"children":[';
				var childs1=false;
				for (var k in sub2Cat){
					if(sub1Cat[j].substring(0,3)==sub2Cat[k].substring(0,3)){
						childs1=true;
						jsonString+='{"name":"'+sub2Cat[k]+'",';
						jsonString+='"children":[';
						var childs=false;
						for (var l in sub3Cat){
							if(sub2Cat[k].substring(0,6)==sub3Cat[l].substring(0,6)){
								childs=true;
								jsonString+='{"name":"'+sub3Cat[l]+'",';
								jsonString+='"size":1},';
							}
						}
						
						if(jsonString.charAt(jsonString.length-1)==','){
							jsonString= jsonString.substring(0, jsonString.length-1);
						}
						jsonString+=']},';
						
						if(!childs){
							jsonString=jsonString.substring(0,jsonString.length-15);
							jsonString+='"size":1},';
						}
						
					}
				}
				
				if(jsonString.charAt(jsonString.length-1)==','){
					jsonString= jsonString.substring(0, jsonString.length-1);
				}
				jsonString+=']},';
				if(!childs1){
					jsonString=jsonString.substring(0,jsonString.length-15);
					jsonString+='"size":1},';
				}
			}
		}
		if(jsonString.charAt(jsonString.length-1)==','){
			jsonString= jsonString.substring(0, jsonString.length-1);
		}
		jsonString+=']},';
		
	}
	jsonString= jsonString.substring(0, jsonString.length-1);
	jsonString+=']}';

	//V DATOTEKO
}



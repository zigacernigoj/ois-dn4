
var baseUrl = 'https://rest.ehrscape.com/rest/v1';
var queryUrl = baseUrl + '/query';

var username = "ois.seminar";
var password = "ois4fri";


var ids=new Array();

ids[0]='e1b61c7e-30ee-4da9-9bbf-2ee869cfa731';
ids[1]='3650b121-4465-4f19-bdf0-1da056bdf401';
ids[2]='e50e6880-2c78-4384-943c-efb9231e1379';


function getSessionId() {
    var response = $.ajax({
        type: "POST",
        url: baseUrl + "/session?username=" + encodeURIComponent(username) +
                "&password=" + encodeURIComponent(password),
        async: false
    });
    return response.responseJSON.sessionId;
}



function addNewUserEHR() {
	sessionId = getSessionId();

	var formName = $("#addName").val();
	var formSurname = $("#addSurname").val();
	var formBirthDate = $("#addBirthDate").val();

	if (!formName || !formSurname || !formBirthDate || formName.trim().length == 0 || formSurname.trim().length == 0 || formBirthDate.trim().length == 0) {
		$("#addUserMessage").html("<span class='obvestilo label label-warning fade-in'>Prosim vnesite podatke.</span>");
	} else {
		$.ajaxSetup({
		    headers: {"Ehr-Session": sessionId}
		});
		$.ajax({
		    url: baseUrl + "/ehr",
		    type: 'POST',
		    success: function (data) {
		        var ehrId = data.ehrId;
		        var partyData = {
		            firstNames: formName,
		            lastNames: formSurname,
		            dateOfBirth: formBirthDate,
		            partyAdditionalInfo: [{key: "ehrId", value: ehrId}]
		        };
		        $.ajax({
		            url: baseUrl + "/demographics/party",
		            type: 'POST',
		            contentType: 'application/json',
		            data: JSON.stringify(partyData),
		            success: function (party) {
		                if (party.action == 'CREATE') {
		                    $("#addUserMessage").html("<span class='obvestilo label label-success fade-in'>Uspešno ustvarjen EHR račun '" + ehrId + "'.</span>");
		                    console.log("Uspešno ustvarjen EHR račun'" + ehrId + "'.");
		                    $("#preberiEHRid").val(ehrId);
							$("#ehrIds").append("<h4>"+formName +" "+ formSurname +":</h4>"+ ehrId+"</br>");
		                }
		            },
		            error: function(err) {
		            	$("#kreirajSporocilo").html("<span class='obvestilo label label-danger fade-in'>Napaka '" + JSON.parse(err.responseText).userMessage + "'!");
		            	console.log(JSON.parse(err.responseText).userMessage);
		            }
		        });
		    }
		});
	}
}





function GenerateUserEHR() {
	
	
	var names=new Array();
	var surnames=new Array();
	var bdays=new Array();
	
	//Ana - mlada sportnica
	names[0]="Ana";
	surnames[0]="Ambrozic";
	bdays[0]="1992-01-01";
	
	//Borut - povprecen srednje star poslovnez
	names[1]="Borut";
	surnames[1]="Bajc";
	bdays[1]="1968-09-03";
	
	//Ciril - starejsi gospod
	names[2]="Ciril";
	surnames[2]="Cankar";
	bdays[2]="1931-06-08";
	
	var j=0;
	for(var i=0; i<3; i++){
	
		sessionId = getSessionId();
		
		$.ajaxSetup({
			headers: {"Ehr-Session": sessionId}
		});
		$.ajax({
			url: baseUrl + "/ehr",
			type: 'POST',
			success: function (data) {
				var ehrId = data.ehrId;
				var partyData = {
					firstNames: names[i],
					lastNames: surnames[i],
					dateOfBirth: bdays[i],
					partyAdditionalInfo: [{key: "ehrId", value: ehrId}]
				};
				$.ajax({
					url: baseUrl + "/demographics/party",
					type: 'POST',
					contentType: 'application/json',
					data: JSON.stringify(partyData),
					success: function (party) {
						if (party.action == 'CREATE') {
							$("#generate").append("<span class='obvestilo label label-success fade-in'>Uporabnik Uspešno.</span></br>");
							console.log("Uspešno ustvarjen EHR račun'" + ehrId + "'.");
							$("#preberiEHRid").val(ehrId);
							$("#ehrIds").append(names[j] + ' ' +surnames[j] + '<div id=ehr'+ j +'>' + ehrId + '</div>');
							ids[j]=ehrId;
							
							j++;
							
						}
					},
					error: function(err) {
						$("#generate").append("<span class='obvestilo label label-danger fade-in'>Uporabnik Napaka: '" + JSON.parse(err.responseText).userMessage + "'!</span></br>");
						console.log(JSON.parse(err.responseText).userMessage);
					}
				});
			}
		});
	}
	generateDiagnosis();
}










function addDiagnosis() {
	sessionId = getSessionId();
	
	var formEhrId=$("#addDEhrId").val();
	var formDiag=$("#addDiag").val();
	var formDesc=$("#addDesc").val();
	var formDate=$("#addDDate").val();
	var formStat=$("#addStat").val();
	$("#result").html(formStat.trim());
	
	if (String(formStat)=="active"){
		formStat="at0026";
	}
	else if (String(formStat)=="inactive"){
		formStat="at0027";
	}
	else if (String(formStat)=="resolved"){
		formStat="at0028";
	}
	else {
		$("#addDiagnosisMessage").html("<span class='obvestilo label label-warning fade-in'>Status je lahko samo Active, Inactive, Resolved</span>");
		formStat="";
	}
	
	if ( !formEhrId || !formDiag || !formDesc || !formDate || !formStat || formEhrId.trim().length == 0 || formDiag.trim().length == 0 || formDesc.trim().length == 0 || formDate.trim().length == 0 || formStat.trim().length == 0) {
		$("#addDiagnosisMessage").append("<span class='obvestilo label label-warning fade-in'>Prosim vnesite podatke.</span>");
		$("#header").html("<div></div>");
	} else {
		$.ajaxSetup({
		    headers: {"Ehr-Session": sessionId}
		});
		
		var podatki={
			"ctx/language":"en",
			"ctx/territory":"SI",
			"ctx/composer_name":"OIS4DN",
			"ctx/time":"2014-12-13T16:16:00.661+01:00",
			"ctx/id_namespace":"HOSPITAL-NS",
			"ctx/id_scheme":"HOSPITAL-NS",
			"ctx/participation_name":"Dr. Doktor Doktorski", 
			"ctx/participation_function":"requester",
			"ctx/participation_mode":"face-to-face communication",    
			"ctx/participation_id":"199",
			"ctx/participation_name:1":"Nekdo Nekdolski",
			"ctx/participation_function:1":"performer",    
			"ctx/participation_id:1":"198",
			"ctx/health_care_facility|name":"Hospital",    
			"ctx/health_care_facility|id":"9091",
			"medical_diagnosis/context/context_detail:0/tags:0":"Tags 61",
			"medical_diagnosis/problem_diagnosis:0/problem_diagnosis|code":"D.43",
			"medical_diagnosis/problem_diagnosis:0/problem_diagnosis|value":formDiag,   
			"medical_diagnosis/problem_diagnosis:0/clinical_description":formDesc,   
			"medical_diagnosis/problem_diagnosis:0/date_of_onset":formDate,  
			"medical_diagnosis/problem_diagnosis:0/date_of_resolution_remission":"2014-12-13T15:16:00.661Z", 
			"medical_diagnosis/problem_diagnosis:0/comment":"Comment 6",   
			"medical_diagnosis/problem_diagnosis:0/link_to_supporting_medical_documentation":"http://example.com/path/resource",   
			"medical_diagnosis/problem_diagnosis:0/problem_context_qualifiers:0/certainty|code":"at0048",  
			"medical_diagnosis/problem_diagnosis:0/problem_context_qualifiers:0/impact|code":"at0039",   
			"medical_diagnosis/problem_diagnosis:0/problem_context_qualifiers:0/category|code":"at0058",   
			"medical_diagnosis/problem_diagnosis:0/problem_context_qualifiers:0/active_status|code":formStat,  
			"medical_diagnosis/problem_diagnosis:0/problem_context_qualifiers:0/active_status_comment":"Active status comment 54",  
			"medical_diagnosis/problem_diagnosis:0/problem_context_qualifiers:0/evolution|code":"at0018",   
			"medical_diagnosis/problem_diagnosis:0/problem_context_qualifiers:0/temporal_context|code":"at0062",    
			"medical_diagnosis/problem_diagnosis:0/problem_context_qualifiers:0/episodicity|code":"at0035",   
			"medical_diagnosis/problem_diagnosis:0/problem_context_qualifiers:0/episodic_care_status|code":"at0067", 
			"medical_diagnosis/problem_diagnosis:0/problem_context_qualifiers:0/priority/value":"Priority 47",   
			"medical_diagnosis/problem_diagnosis:0/problem_context_qualifiers:0/priority/value2":7,  
			"medical_diagnosis/problem_diagnosis:0/problem_context_qualifiers:0/summarisation/value":true,    
			"medical_diagnosis/problem_diagnosis:0/problem_context_qualifiers:0/summarisation/value2":"Summarisation 19"
		};
		
		var parametriZahteve = {
		    "ehrId": formEhrId,
		    templateId: 'Medical Diagnosis',
		    format: 'FLAT',
		    committer: "OIS4DN"
		};
		$.ajax({
		    url: baseUrl + "/composition?" + $.param(parametriZahteve),
		    type: 'POST',
		    contentType: 'application/json',
		    data: JSON.stringify(podatki),
		    success: function (res) {
		    	console.log(res.meta.href);
		        $("#header").html("<span class='obvestilo label label-success fade-in'>" + res.meta.href + ".</span>");
		    },
		    error: function(err) {
		    	$("#header").html("<span class='obvestilo label label-danger fade-in'>Napaka '" + JSON.parse(err.responseText).userMessage + "'!");
				console.log(JSON.parse(err.responseText).userMessage);
		    }
		});
	}
}





function generateDiagnosis() {
	
	var ehrs=new Array();
	var diags=new Array();
	var descs=new Array();
	var dates=new Array();
	var stats=new Array();
	
	//Ana
	ehrs[0]=ids[0];
	diags[0]="zvit glezenj";
	descs[0]="zvit glezenj";
	dates[0]="2012-06-06"
	stats[0]="at0028";
	
	//Borut
	ehrs[1]=ids[1];
	diags[1]="pljucnica";
	descs[1]="pljucno obolenje";
	dates[1]="2014-12-12";
	stats[1]="at0027";
	
	//Ciril
	ehrs[2]=ids[2];
	diags[2]="alzheimerjeva bolezen";
	descs[2]="alzheimerjeva bolezen";
	dates[2]="2013-04-01";
	stats[2]="at0026";

	for(var i=0; i<3; i++){
	
		sessionId = getSessionId();
		

			$.ajaxSetup({
				headers: {"Ehr-Session": sessionId}
			});
			
			var podatki={
				"ctx/language":"en",
				"ctx/territory":"SI",
				"ctx/composer_name":"OIS4DN",
				"ctx/time":"2014-12-13T16:16:00.661+01:00",
				"ctx/id_namespace":"HOSPITAL-NS",
				"ctx/id_scheme":"HOSPITAL-NS",
				"ctx/participation_name":"Dr. Doktor Doktorski", 
				"ctx/participation_function":"requester",
				"ctx/participation_mode":"face-to-face communication",    
				"ctx/participation_id":"199",
				"ctx/participation_name:1":"Nekdo Nekdolski",
				"ctx/participation_function:1":"performer",    
				"ctx/participation_id:1":"198",
				"ctx/health_care_facility|name":"Hospital",    
				"ctx/health_care_facility|id":"9091",
				"medical_diagnosis/context/context_detail:0/tags:0":"Tags 61",
				"medical_diagnosis/problem_diagnosis:0/problem_diagnosis|code":"D.43",
				"medical_diagnosis/problem_diagnosis:0/problem_diagnosis|value":diags[i],   
				"medical_diagnosis/problem_diagnosis:0/clinical_description":descs[i],   
				"medical_diagnosis/problem_diagnosis:0/date_of_onset":dates[i],  
				"medical_diagnosis/problem_diagnosis:0/date_of_resolution_remission":"2014-12-13T15:16:00.661Z", 
				"medical_diagnosis/problem_diagnosis:0/comment":"Comment 6",   
				"medical_diagnosis/problem_diagnosis:0/link_to_supporting_medical_documentation":"http://example.com/path/resource",   
				"medical_diagnosis/problem_diagnosis:0/problem_context_qualifiers:0/certainty|code":"at0048",  
				"medical_diagnosis/problem_diagnosis:0/problem_context_qualifiers:0/impact|code":"at0039",   
				"medical_diagnosis/problem_diagnosis:0/problem_context_qualifiers:0/category|code":"at0058",   
				"medical_diagnosis/problem_diagnosis:0/problem_context_qualifiers:0/active_status|code":stats[0],  
				"medical_diagnosis/problem_diagnosis:0/problem_context_qualifiers:0/active_status_comment":"Active status comment 54",  
				"medical_diagnosis/problem_diagnosis:0/problem_context_qualifiers:0/evolution|code":"at0018",   
				"medical_diagnosis/problem_diagnosis:0/problem_context_qualifiers:0/temporal_context|code":"at0062",    
				"medical_diagnosis/problem_diagnosis:0/problem_context_qualifiers:0/episodicity|code":"at0035",   
				"medical_diagnosis/problem_diagnosis:0/problem_context_qualifiers:0/episodic_care_status|code":"at0067", 
				"medical_diagnosis/problem_diagnosis:0/problem_context_qualifiers:0/priority/value":"Priority 47",   
				"medical_diagnosis/problem_diagnosis:0/problem_context_qualifiers:0/priority/value2":7,  
				"medical_diagnosis/problem_diagnosis:0/problem_context_qualifiers:0/summarisation/value":true,    
				"medical_diagnosis/problem_diagnosis:0/problem_context_qualifiers:0/summarisation/value2":"Summarisation 19"
			};
			
			var parametriZahteve = {
				"ehrId": ehrs[i],
				templateId: 'Medical Diagnosis',
				format: 'FLAT',
				committer: "OIS4DN"
			};
			$.ajax({
				url: baseUrl + "/composition?" + $.param(parametriZahteve),
				type: 'POST',
				contentType: 'application/json',
				data: JSON.stringify(podatki),
				success: function (res) {
					console.log(res.meta.href);
					$("#generate").append("<span class='obvestilo label label-success fade-in'>" + res.meta.href + ".</span></br>");
				},
				error: function(err) {
					$("#generate").append("<span class='obvestilo label label-danger fade-in'>Diagnoza Napaka '" + JSON.parse(err.responseText).userMessage + "'!</span></br>");
					console.log(JSON.parse(err.responseText).userMessage);
				}
			});
	}
}



function loadAdd(){
	
$("#ehrIds").append("<h4>Ana Ambrozic:</h4>e1b61c7e-30ee-4da9-9bbf-2ee869cfa731</br>");
$("#ehrIds").append("<h4>Borut Bajc:</h4>3650b121-4465-4f19-bdf0-1da056bdf401</br>");
$("#ehrIds").append("<h4>Ciril Cankar:</h4>e50e6880-2c78-4384-943c-efb9231e1379</br>");
	
	
	var addU="<option value='Ana,Ambrozic,1992-01-01'>Ana Ambrozic</option>";
	addU+="<option value='Borut,Bajc,1968-09-03'>Borut Bajc</option>";
	addU+="<option value='Ciril,Cankar,1931-06-08'>Ciril Cankar</option>";
	
	var addD="<option value='"+ids[0]+",zvit glezenj,zvit glezenj,2012-06-06,active'>Ana Ambrozic</option>";
	addD+="<option value='"+ids[1]+",plucnica,pljucno obolenje,2014-12-12,inactive'>Borut Bajc</option>";
	addD+="<option value='"+ids[2]+",alzheimerjeva bolezen,alzheimerjeva bolezen,2013-04-01,active'>Ciril Cankar</option>";
	
	var diagnoze="<option value='"+ids[0]+"'>Ana Ambrozic</option>";
	diagnoze+="<option value='"+ids[1]+"'>Borut Bajc</option>";
	diagnoze+="<option value='"+ids[2]+"'>Ciril Cankar</option>";
	
	UserReady
	$("#UserReady").append(addU);
	$("#DiagReady").append(addD);
	$("#preberiEhrIdZaVitalneZnake").append(diagnoze);
}











$(document).ready(function() {
	$('#DiagReady').change(function() {
		$("#addDiagnosisMessage").html("");
		var prejdolocen = $(this).val().split(",");
		$("#addDEhrId").val(prejdolocen[0]);
		$("#addDiag").val(prejdolocen[1]);
		$("#addDesc").val(prejdolocen[2]);
		$("#addDDate").val(prejdolocen[3]);
		$("#addStat").val(prejdolocen[4]);
	});
});












$(document).ready(function() {
	$('#UserReady').change(function() {
		$("#addUserMessage").html("");
		var podatki = $(this).val().split(",");
		$("#addName").val(podatki[0]);
		$("#addSurname").val(podatki[1]);
		$("#addBirthDate").val(podatki[2]);
	});
});

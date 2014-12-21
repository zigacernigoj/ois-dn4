
var baseUrl = 'https://rest.ehrscape.com/rest/v1';
var queryUrl = baseUrl + '/query';

var username = "ois.seminar";
var password = "ois4fri";

function getSessionId() {
    var response = $.ajax({
        type: "POST",
        url: baseUrl + "/session?username=" + encodeURIComponent(username) +
                "&password=" + encodeURIComponent(password),
        async: false
    });
    return response.responseJSON.sessionId;
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
	sessionId = getSessionId();
	
	var ehrs=new Array();
	var diags=new Array();
	var descs=new Array();
	var dates=new Array();
	var stats=new Array();
	
	//Ana
	ehrs[0]=document.getElementById("ehr0");
	diags[0]="zvit glezenj";
	descs[0]="zvit glezenj";
	dates[0]="2012-06-06"
	stats[0]="resolved";
	
	//Borut
	ehrs[1]=document.getElementById("ehr1");
	diags[1]="";
	descs[1]="";
	dates[1]="";
	stats[1]="";
	
	
	
	//Ciril
	ehrs[2]=document.getElementById("ehr0");
	diags[2]=
	descs[2]=
	dates[2]=
	stats[2]=
	
	
	
	
	
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

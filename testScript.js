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


function preberiEHRodBolnika() {
	sessionId = getSessionId();

	var ehrId = $("#preberiEHRid").val();

	if (!ehrId || ehrId.trim().length == 0) {
		$("#preberiSporocilo").html("<span class='obvestilo label label-warning fade-in'>Prosim vnesite zahtevan podatek!");
	} else {
		$.ajax({
			url: baseUrl + "/demographics/ehr/" + ehrId + "/party",
			type: 'GET',
			headers: {"Ehr-Session": sessionId},
	    	success: function (data) {
				var party = data.party;
				$("#krneki").html("<div class='krneki'>Bolnik '" + party.firstNames + " " + party.lastNames + "', ki se je rodil '" + party.dateOfBirth + "'.</div>");
				console.log("Bolnik '" + party.firstNames + " " + party.lastNames + "', ki se je rodil '" + party.dateOfBirth + "'.");
			},
			error: function(err) {
				$("#preberiSporocilo").html("<span class='obvestilo label label-danger fade-in'>Napaka '" + JSON.parse(err.responseText).userMessage + "'!");
				console.log(JSON.parse(err.responseText).userMessage);
			}
		});
	}	
}


function preberiMeritveVitalnihZnakov() {
	sessionId = getSessionId();	

	var ehrId = $("#meritveVitalnihZnakovEHRid").val();
	var tip = $("#preberiTipZaVitalneZnake").val();
	
	
		//var ehrId = $("#preberiEHRid").val();

	/*if (!ehrId || ehrId.trim().length == 0) {
		$("#preberiSporocilo").html("<span class='obvestilo label label-warning fade-in'>Prosim vnesite zahtevan podatek!");
	} else {
		$.ajax({
			url: baseUrl + "/demographics/ehr/" + ehrId + "/party",
			type: 'GET',
			headers: {"Ehr-Session": sessionId},
	    	success: function (data) {
				var party = data.party;
				$("#krneki").html("<div class='krneki'>Bolnik '" + party.firstNames + " " + party.lastNames + "', ki se je rodil '" + party.dateOfBirth + "'.</div>");
				console.log("Bolnik '" + party.firstNames + " " + party.lastNames + "', ki se je rodil '" + party.dateOfBirth + "'.");
			},
			error: function(err) {
				$("#preberiSporocilo").html("<span class='obvestilo label label-danger fade-in'>Napaka '" + JSON.parse(err.responseText).userMessage + "'!");
				console.log(JSON.parse(err.responseText).userMessage);
			}
		});
	}*/
	
	
	
	

	if (!ehrId || ehrId.trim().length == 0) {
		$("#preberiMeritveVitalnihZnakovSporocilo").html("<span class='obvestilo label label-warning fade-in'>Prosim vnesite zahtevan podatek!");
	} else {
		$("#preberiMeritveVitalnihZnakovSporocilo").html("");
		var AQL = "select "+
			"e/ehr_id/value as ehr_id_value, "+
			"a_a/data[at0001]/items[at0002]/value/value as Problem_Diagnosis, "+
			"a_a/data[at0001]/items[at0009]/value/value as Clinical_description, "+
			"a_a/data[at0001]/items[at0010]/value/value as Date_of_onset, "+
			"a_a/data[at0001]/items[at0030]/value/value as Date_of_resolution_remission, "+
			"a_b/items[at0024]/value/value as Impact, "+
			"a_b/items[at0003]/value/value as Active_status, "+
			"a_b/items[at0001]/value/value as Episodicity "+
			"from EHR e "+
			"contains COMPOSITION a "+
			"contains ( "+
				"EVALUATION a_a[openEHR-EHR-EVALUATION.problem_diagnosis.v1] and "+
				"CLUSTER a_b[openEHR-EHR-CLUSTER.problem_status.v1]) "+
			"where ehr_id_value='"+ ehrId +"'";
				
				
				
				
		$.ajax({
			url: baseUrl + "/query?" + $.param({"aql": AQL}),
			type: 'GET',
			headers: {"Ehr-Session": sessionId},
			success: function (res) {
				var results = "<table class='table table-striped table-hover'><tr><th>Diagnosis</th><th>Description</th><th>Diagnosis date</th><th>Status</th></tr>";
				if (res) {
					var rows = res.resultSet;
					for (var i in rows) {
						if(rows[i].Clinical_description==null){
							rows[i].Clinical_description="-";
						}
						results += "<tr><td>" + rows[i].Problem_Diagnosis + "</td><td>" + rows[i].Clinical_description  + "</td><td>" + rows[i].Date_of_onset  + "</td><td>" + rows[i].Active_status + "</td></tr>";
					}
					results += "</table>";
					$("#rezultatMeritveVitalnihZnakov").html(results);
					
					
				} else {
					$("#rezultatMeritveVitalnihZnakov").html("Ni diagnoz! :)");
				}

			},
			error: function() {
				$("#preberiMeritveVitalnihZnakovSporocilo").html("<span class='obvestilo label label-danger fade-in'>Napaka '" + JSON.parse(err.responseText).userMessage + "'!");
				console.log(JSON.parse(err.responseText).userMessage);
			}
		});
		
		
		
		
		
		
		
		
	}
}


function searchByName(){
	//sessionId = getSessionId();

	$.ajaxSetup({
		headers: {
			"Ehr-Session": sessionId,
		}
	});
	
	
	var formName = $("#addName").val();
	var formSurname = $("#addSurname").val();
	
	if (!formName || !formSurname || formName.trim().length == 0 || formSurname.trim().length == 0) {
		$("#addFormMessage").html("<span class='obvestilo label label-warning fade-in'>Prosim vnesite zahtevan podatek!</span>");
	} else {
		$("#addFormMessage").html("<span class='obvestilo label label-info fade-in'>"+formName + " " + formSurname+"</span>");
		var searchData = [
			{key: "firstNames", value: "Mary"},
			{key: "lastNames", value: "Wilkinson"}
		];
		
	
	
		$.ajax({
			url: baseUrl + "/demographics/party/query",
			type: 'GET',
			contentType: 'application/json',
			data: JSON.stringify(searchData),
			success: function (res) {
				for (i in res.parties) {
					var party = res.parties[i];
					var ehrId;
					for (j in party.partyAdditionalInfo) {
						if (party.partyAdditionalInfo[j].key === 'ehrId') {
							ehrId = party.partyAdditionalInfo[j].value;
							break;
						}
					}
					$("#result").append(party.firstNames + ' ' + party.lastNames +
						' (ehrId = ' + ehrId + ')<br>');
				}
			}
		});
	}

}

$(document).ready(function() {
	$('#preberiObstojeciEHR').change(function() {
		$("#preberiSporocilo").html("");
		$("#preberiEHRid").val($(this).val());
	});
	$('#readReady').change(function() {
		$("#addFormMessage").html("");
		var podatki = $(this).val().split(",");
		$("#addName").val(podatki[0]);
		$("#addSurname").val(podatki[1]);
	});
	$('#preberiObstojeciVitalniZnak').change(function() {
		$("#dodajMeritveVitalnihZnakovSporocilo").html("");
		var podatki = $(this).val().split("|");
		$("#dodajVitalnoEHR").val(podatki[0]);
		$("#dodajVitalnoDatumInUra").val(podatki[1]);
		$("#dodajVitalnoTelesnaVisina").val(podatki[2]);
		$("#dodajVitalnoTelesnaTeza").val(podatki[3]);
		$("#dodajVitalnoTelesnaTemperatura").val(podatki[4]);
		$("#dodajVitalnoKrvniTlakSistolicni").val(podatki[5]);
		$("#dodajVitalnoKrvniTlakDiastolicni").val(podatki[6]);
		$("#dodajVitalnoNasicenostKrviSKisikom").val(podatki[7]);
		$("#dodajVitalnoMerilec").val(podatki[8]);
	});
	
	$('#preberiEhrIdZaVitalneZnake').change(function() {
		$("#preberiMeritveVitalnihZnakovSporocilo").html("");
		$("#rezultatMeritveVitalnihZnakov").html("");
		$("#meritveVitalnihZnakovEHRid").val($(this).val());
	});
});
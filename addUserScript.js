
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


function addNewUserEHR() {
	sessionId = getSessionId();

	var formName = $("#addName").val();
	var formSurname = $("#addSurname").val();
	var formBirthDate = $("#addBirthDate").val();

	if (!formName || !formSurname || !formBirthDate || formName.trim().length == 0 || formSurname.trim().length == 0 || formBirthDate.trim().length == 0) {
		$("#addFormMessage").html("<span class='obvestilo label label-warning fade-in'>Prosim vnesite podatke.</span>");
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
		                    $("#addFormMessage").html("<span class='obvestilo label label-success fade-in'>Uspešno ustvarjen EHR račun '" + ehrId + "'.</span>");
		                    console.log("Uspešno ustvarjen EHR račun'" + ehrId + "'.");
		                    $("#preberiEHRid").val(ehrId);
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


$(document).ready(function() {
	$('#readReady').change(function() {
		$("#addFormMessage").html("");
		var podatki = $(this).val().split(",");
		$("#addName").val(podatki[0]);
		$("#addSurname").val(podatki[1]);
		$("#addBirthDate").val(podatki[2]);
	});
});

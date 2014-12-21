function focusGuide() {
	if(document.getElementById("guideShow").style.display == 'none'){
		document.getElementById("guideShow").style.display = 'block';
		$("#hg").append("<span class='label label-default fade-in'>opened</span>");
	}
	else if(document.getElementById("guideShow").style.display == 'block'){
		document.getElementById("guideShow").style.display = 'none';
		$("#hg").append("");
	}
}

function focusUser() {
	if(document.getElementById("userShow").style.display == 'none'){
		document.getElementById("userShow").style.display = 'block';
		$("#hu").append("<span class='label label-default fade-in'>opened</span>");
	}
	else if(document.getElementById("userShow").style.display == 'block'){
		document.getElementById("userShow").style.display = 'none';	
		$("#hu").append("");
	}
}

function focusDiagnosis() {
	if(document.getElementById("diagnosisShow").style.display == 'none'){
		document.getElementById("diagnosisShow").style.display = 'block';
			$("#hd").append("<span class='label label-default fade-in'>opened</span>");
	}
	else if(document.getElementById("diagnosisShow").style.display == 'block'){
		document.getElementById("diagnosisShow").style.display = 'none';
		$("#hd").append("");		
	}
}

function focusShowDiag() {
	if(document.getElementById("dataShow").style.display == 'none'){
		document.getElementById("dataShow").style.display = 'block';
			$("#hs").append("<span class='label label-default fade-in'>opened</span>");
	}
	else if(document.getElementById("dataShow").style.display == 'block'){
		document.getElementById("dataShow").style.display = 'none';		
		$("#hs").append("");
	}
}

function focusVisu() {
	if(document.getElementById("visuShow").style.display == 'none'){
		document.getElementById("visuShow").style.display = 'block';
		$("#hint2").append("<span class='label label-default fade-in'>scroll down</span>");
		$("#hint2").append("</br><a href='testd3a.html'>Open in new window, if you want.</a>");
	}
	else if(document.getElementById("visuShow").style.display == 'block'){
		document.getElementById("visuShow").style.display = 'none';	
		$("#hint2").html("");		
	}
}


function focusTable() {
	if(document.getElementById("tableShow").style.display == 'none'){
		document.getElementById("tableShow").style.display = 'block';
		$("#hint1").append("<span class='label label-default fade-in'>scroll down</span>");
	}
	else if(document.getElementById("tableShow").style.display == 'block'){
		document.getElementById("tableShow").style.display = 'none';	
		$("#hint1").html("");
	}
}
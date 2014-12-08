/*
 * Juan Manuel Rodríguez Trillo
 * GitHub: https://github.com/WanManolo
 * 
 * Proyecto final del curso
 * 
 * Programa que utiliza JQuery para gestionar peticiones a servidor.js 
 * y el DOM
 * 
 * */

function init() {
	$(document).ready(function() {
		$('#menuJ').hide();
		$('#menuE').hide();
		$('#resultado').text('');
		$('#log').hide();
		$('#inicio').show();
	});
}

/*
 * LISTA
 * 
 * 		<div id="page">
 * 			<div id="inicio">
 * 				<p><input id="submitMJ" type="submit" 
 * 				<p><input id="submitME" type="submit" 
 * 			<div id="menuJ">
 * 				<table id="tablaJ1"
 * 				<div id="panelJ">
 * 								<input id="txtJid" type="text" 
 * 				<div id="panelJPost">
 * 						<tr id="trIdJ">
 * 									<input id="radio_Portero" type="radio" name="pos" 
 * 									<input id="radio_Defensa" type="radio" name="pos" 
 * 									<input id="radio_Centro" type="radio" name="pos" 
 * 									<input id="radio_Delantero" type="radio" name="pos" 
 * 								<select id="selE" name="selE">
 * 							<td id="subFormModJ">
 * 							<td id="subFormNewJ">
 * 
 * */

// Petición de los jugadores con JQuery
function menuJugador() {
	$(document).ready(function() {
		// GET Jugadores
		$.get('/Jugador', function(data) {
			// Creamos la tabla con los contenidos
			var tabla = "<tBody>";
			// Para cada jugador en el JSON
			var keys = Object.keys(data);
			for (var i=0; i<keys.length; i++) {
				tabla += "<tr><td> ID: "+keys[i]+"</td><td> Nombre: "+data[keys[i]].name+"</td><td> Posición: "+data[keys[i]].pos+"</td><td> Equipo: "+data[keys[i]].team+"</td></tr>";
			}
			tabla += "</tBody>";
			// Establecemos el código de la tabla
			$('#tablaJ1').html(tabla);
			// Esquema final de los divs
		$('#inicio').hide();
		$('#panelJPost').hide();
		$('#panelJ').show();
		$('#menuJ').fadeToggle('slow');
		$('#log').show();
		});
		
		
	});
}

// Petición de los equipos con JQuery
function menuEquipo() {
	$(document).ready(function() {
		// GET Equipos
		$.get('/Equipo', function(data) {
			// Creamos la tabla con los contenidos
			var tabla = "<tBody>";
			// Para cada Equipo en el JSON
			var keys = Object.keys(data);
			for (var i=0; i<keys.length; i++) {
				tabla += "<tr><td> ID: "+keys[i]+"</td><td> Nombre: "+data[keys[i]].name+"</td><td> Jugadores: "+data[keys[i]].nj+"</td></tr>";
			}
			tabla += "</tBody>";
			// Establecemos el código de la tabla
			$('#tablaE1').html(tabla);
		});
		
		// Esquema final de los divs
		$('#inicio').hide();
		$('#panelEPost').hide();
		$('#panelE').show();
		$('#menuE').fadeToggle('slow');
		$('#log').show();
	});
}

// Petición de los Equipos con AJAX (XMLHttpRequest) y JQuery DOM
function menuEquipoAJAX() {
	$(document).ready(function() {
		// Creación de la petición XMLHttp
		var oXHR = new XMLHttpRequest();
		oXHR.open("GET", "/Equipo", true);
		oXHR.onreadystatechange = function (oEvent) {
			if (oXHR.readyState === 4) {
				if (oXHR.status === 200) {
					// Parseamos el JSON recibido
					var data = JSON.parse(request.responseText);
					// Creamos la tabla con los contenidos
					var tabla = "<tBody>";
					// Para cada Equipo en el JSON
					var keys = Object.keys(data);
					for (var i=0; i<keys.length; i++) {
						tabla += "<tr><td> ID: "+keys[i]+"</td><td> Nombre: "+data[keys[i]].name+"</td><td> Jugadores: "+data[keys[i]].nj+"</td></tr>";
					}
					tabla += "</tBody>";
					// Establecemos el código de la tabla
					$('#tablaE1').html(tabla);
				}
				else {
					console.log("Error", oXHR.statusText);
				}
			}
		};
		// Se envía la respuesta
		oXHR.send(request.responseText);
		
		// Esquema final de los divs
		$('#inicio').hide();
		$('#panelEPost').hide();
		$('#panelE').show();
		$('#menuE').fadeToggle('slow');
		$('#log').show();
	});
}

// Petición para obtener un jugador en concreto
function formVerJ() {
	$(document).ready(function() {
		var id = $('#txtJid').val();
		$.get('/Jugador/'+id, function(data) {
			// Creamos la tabla con los contenidos
			var tabla = "ID: "+id+"    Nombre: "+data.name+"       Posición: "+data.pos+"     Equipo: "+data.team;
			$('#resultado').text(tabla);
		});
	});
}

// Petición para obtener un equipo en concreto
function formVerE() {
	$(document).ready(function() {
		var id = $('#txtEid').val();
		$.get('/Equipo/'+id, function(data) {
			// Creamos la tabla con los contenidos
			var tabla = "ID: "+id+"   Nombre: "+data.name+"    Jugadores: "+data.nj;
			$('#resultado').text(tabla);
		});
	});
}

// Cambio al formulario para Modificar un Jugador
function formModJ() {
	$(document).ready(function() {
		// Creamos la lista de equipos del selector
		$.get('/Equipo', function(data) {
			// Eliminamos las opciones previas
			$('#selE').find('option').remove().end();
			// Para cada Equipo lo introducimos como opcion
			var keys = Object.keys(data);
			for (var i=0; i<keys.length; i++) {
				$('#selE').append($('<option>', {
					value: keys[i],
					text: data[keys[i]].name
				}));
			}
		});
		
		$('#submitDoModJ').show();
		$('#submitDoNewJ').hide();
		$('#panelJ').hide();
		$('#resultado').text('');
		$('#panelJPost').fadeToggle('slow');
		$('#log').show();
	});
}

// Cambio al formulario para Crear un Jugador
function formNewJ() {
	$(document).ready(function() {
		// Creamos la lista de equipos del selector
		$.get('/Equipo', function(data) {
			// Eliminamos las opciones previas
			$('#selE').find('option').remove().end();
			// Para cada Equipo lo introducimos como opcion
			var keys = Object.keys(data);
			for (var i=0; i<keys.length; i++) {
				$('#selE').append($('<option>', {
					value: keys[i],
					text: data[keys[i]].name
				}));
			}
		});
		
		$('#submitDoModJ').hide();
		$('#submitDoNewJ').show();
		$('#panelJ').hide();
		$('#resultado').text('');
		$('#panelJPost').fadeToggle('slow');
		$('#log').show();
	});
}

// Cambio al formulario para Modificar un Equipo
function formModE() {
	$(document).ready(function() {
		$('#submitDoModE').show();
		$('#submitDoNewE').hide();
		$('#panelE').hide();
		$('#resultado').text('');
		$('#panelEPost').fadeToggle('slow');
		$('#log').show();
	});
}

// Cambio al formulario para Crear un Equipo
function formNewE() {
	$(document).ready(function() {
		$('#submitDoModE').hide();
		$('#submitDoNewE').show();
		$('#panelE').hide();
		$('#resultado').text('');
		$('#panelEPost').fadeToggle('slow');
		$('#log').show();
	});
}

// Eliminar un Jugador
function delJugador() {
	// Parámetros de los inputs
	var id = $('#txtJid').val();
	// Petición desde JQuery
	$.post('/jugador/del/'+id, function(response) {
		alert(response);
	});
}

// Eliminar un Equipo
function delEquipo() {
	// Parámetros de los inputs
	var id = $('#txtEid').val();
	// Petición desde JQuery
	$.post('/equipo/del/'+id, function(response) {
		alert(response);
	});
}

// Petición PUT de un nuevo jugador
function doNewJ() {
	// Parámetros de los inputs
	var id = $('#txtJid').val();
	var nom = $('#txtJnombre').val();
	var pos = $('input:radio:checked').val();
	var eq = $("#selE").val();
	// Petición desde JQuery
	$.ajax( {
		url: '/jugador/'+id+'/'+nom+'/'+pos+'/'+eq,
		type: 'PUT',
		success: function(response) {
			$('#resultado').text(response);
			}
	});
}

// Petición PUT de un nuevo equipo
function doNewE() {
	// Parámetros de los inputs
	var id = $('#txtEid').val();
	var nom = $('#txtEnombre').val();
	// Petición desde JQuery
	$.ajax( {
		url: '/equipo/'+id+'/'+nom,
		type: 'PUT',
		success: function(response) {
			$('#resultado').text(response);
			}
	});
}

// Petición POST de un jugador
function doModJ() {
	// Parámetros de los inputs
	var id = $('#txtJid').val();
	var nom = $('#txtJnombre').val();
	var pos = $('input:radio:checked').val();
	var eq = $("#selE").val();
	// Petición desde JQuery
	$.post('/jugador/'+id+'/'+nom+'/'+pos+'/'+eq, function(response) {
		$('#resultado').text(response);
	});
}

// Petición POST de un equipo
function doModE() {
	// Parámetros de los inputs
	var id = $('#txtEid').val();
	var nom = $('#txtEnombre').val();
	// Petición desde JQuery
	$.post('/equipo/'+id+'/'+nom, function(response) {
		$('#resultado').text(response);
	});
}


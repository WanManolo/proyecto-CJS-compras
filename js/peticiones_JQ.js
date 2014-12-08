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
		$('#menuCliente').hide();
		$('#menuProducto').hide();
		$('#newCliente').hide();
		$('#postCliente').hide();
		$('#resultado').hide();
		$('#inicio').show();
	});
}

// Petición de los clientes con JQuery
function menuClientes() {
	$(document).ready(function() {
		$('#panelCliente').show();
		$.get('/cliente', function(data) {
			// Creamos la tabla con los contenidos
			var keys = Object.keys(data);
			var txt = "<tBody>";
			for (var i = 0; i<keys.length; i++) {
				txt += "<tr><td>ID: "+keys[i]+"</td><td>Nombre: "+data[keys[i]].nombre+"</td><td>E-Mail: "+data[keys[i]].mail+"</td></tr>";
			}
			txt += "</tBody>";
			// Establecemos el código de la tabla
			$('#myTableClientes').html(txt);
			// Ocultamos el menú de inicio
			$('#inicio').fadeToggle('fast');
			// Mostramos el resultado
			$('#menuCliente').fadeToggle('fast');
			});
		});
}

// Petición para obtener un cliente en concreto
function verCliente() {
	var id = $('#txtCliente').val();
	$.get('/cliente/'+id, function(data) {
		$('#menuCliente').fadeToggle('fast');
		// Creamos la tabla con los contenidos
		var txt = "<table border=1><tBody>";
		txt += "<tr><td>ID: "+id+"</td><td>Nombre: "+data.nombre+"</td><td>E-Mail: "+data.mail+"</td></tr>";
		txt += "</tBody></table>";
		$('#resultado').html(txt);
		$('#resultado').fadeToggle('fast');
	});
}

// Petición de los productos con AJAX de forma explícita y JQuery
// para manejar el DOM
function listaProductos() {
	// Creación de la petición XMLHttp
	var request = new XMLHttpRequest();
	// Se realiza la petición GET a la url
	request.open('GET', '/producto', false);
	// Se envía la respuesta
	request.send(request.responsetext);
	// Si todo ha ido bien
	if (request.readyState == 4) {
		if (request.status == 200) {
			// Parseamos el JSON recibido
			var json = JSON.parse(request.responseText);
			// Creamos la tabla con los contenidos
			var keys = Object.keys(json);
			var txt = "<tBody>";
			for (var i = 0; i<keys.length; i++) {
				txt += "<tr><td>ID: "+keys[i]+"</td><td>Precio: "+json[keys[i]].precio+"</td><td>Stock: "+json[keys[i]].stock+"</td></tr>";
			}
			txt += "</tBody>";
			// Establecemos el código de la tabla
			$('#myTableProductos').html(txt);
			// Ocultamos el menú de inicio
			$('#inicio').fadeToggle('fast');
			// Mostramos el resultado
			$('#menuProducto').fadeToggle('fast');
		}
	}
}

function newFormCliente() {
	$('#panelCliente').fadeToggle('fast');
	$('#newCliente').fadeToggle('fast');
}

// Petición PUT de un nuevo cliente
function newCliente() {
	// Obtenemos los parámetros de los inputs
	var id = $('#newTxtId').val();
	var nom = $('#newTxtNombre').val();
	var mail = $('#newTxtMail').val();
	// Creamos la petición con JQuery
	$.ajax( {
		url: '/cliente/new/'+id+'/'+nom+'/'+mail,
		type: 'PUT',
		success: function(result) {
			$('#resultado').html(result);
			$('#resultado').fadeToggle('fast');
			}
	});
}

function modFormCliente() {
	$('#panelCliente').fadeToggle('fast');
	$('#postCliente').fadeToggle('fast');
}

// Petición POST de un cliente
function modCliente() {
	// Obtenemos los parámetros de los inputs
	var id = $('#txtCliente').val();
	var nom = $('#modTxtNombre').val();
	var mail = $('#modTxtMail').val();
	// Creamos la petición con JQuery
	$.ajax( {
		url: '/cliente/'+id+'/'+nom+'/'+mail,
		type: 'POST',
		success: function(result) {
			$('#resultado').html(result);
			$('#resultado').fadeToggle('fast');
			}
	});
}

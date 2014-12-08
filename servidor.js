/*
 * Juan Manuel Rodríguez Trillo
 * GitHub: https://github.com/WanManolo
 * 
 * Proyecto final del curso
 * Servidor principal
 * 
 * Uso:		node servidor.js
 * 			acceso a la web
 * 			cliente node.js
 * */


// Includes
var express = require('express');
//~ var fs = require('fs');
var index = './html/index.html';

var app = express();
// Inicio del objeto de productos básico, alternativa a una BD no volátil
var prods = {
	patatas: {precio: 1, stock: 1},
	leche: {precio: 2, stock: 1}
	};
// Inicio del objeto de clientes básico
var clientes = {
	wan: {nombre: 'Juan', mail: 'oneman.rt@gmail.com'},
	pak: {nombre: 'Paco', mail: 'lapakaloca@correo.com'}
	};

// Index
app.get('/', function (req, res) {
	res.sendfile(index);
});

// JavaScript src
app.get('/js/:page', function (req, res) {
	res.contentType('text/javascript');
	res.sendfile('./js/'+req.params.page);
});

// Nivel de todos los productos
app.get('/producto', function (req, res) {
	res.contentType('application/json');
	res.send(prods);
});

// Nivel de todos los clientes
app.get('/cliente', function (req, res) {
	res.contentType('application/json');
	res.send(clientes);
});

// Creación de un producto de base 1
app.put('/producto/new/:nombre/:valor', function( req,res ) {
	prods[req.params.nombre] = {
		precio: req.params.valor, stock: 1
		};
	res.send("Se ha introducido un nuevo producto: "+req.params.nombre);
});

// Creación de un cliente nuevo
app.put('/cliente/new/:id/:nombre/:correo', function( req,res ) {
	clientes[req.params.id] = {
		nombre: req.params.nombre,
		mail: req.params.correo
		};
	res.send("Se ha introducido un nuevo cliente: "+req.params.id);
});

// Nivel de Producto/id
app.get('/producto/:id', function (req, res) {
	res.contentType('application/json');
	res.send(prods[req.params.id]);
});

// Nivel de Cliente/id
app.get('/cliente/:id', function (req, res) {
	res.contentType('application/json');
	res.send(clientes[req.params.id]);
});

// Actualización de Producto
app.post('/producto/:id/:stock', function (req, res) {
	prods[req.params.id].stock += req.params.stock;
	res.contentType('application/json');
	res.send(prods[req.params.id]);
});

// Actualización de Cliente
app.post('/cliente/:id/:nombre/:correo', function (req, res) {
	clientes[req.params.id].nombre = req.params.nombre;
	clientes[req.params.id].mail = req.params.correo;
	res.contentType('application/json');
	res.send("Se ha modificado un cliente existente: "+req.params.id);
});

var puerto = 8080;
var ip = 'http://127.0.0.1';

//~ var port = process.env.OPENSHIFT_NODEJS_PORT || 8080 ;
//~ var ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1' ;

app.listen(puerto);
console.log('Server running at '+ip+':'+puerto+'/');

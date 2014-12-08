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

// Inicio de express
var app = express();

// Inicio del objeto de equipos
var teams = {
	eq1: { name: 'Equipo 1', nj: 1},
	eq2: { name: 'Equipo 2', nj: 1}
	};
// Inicio del objeto de jugadores
var players = {
	wan: {name: 'Juan', pos: 'Defensa', team: 'Equipo 1'},
	pak: {name: 'Paco', pos: 'Portero', team: 'Equipo 2'}
	};

// Index
app.get('/', function (req, res) {
	res.sendfile('./html/index.html');
});

// JavaScript src
app.get('/js/:page', function (req, res) {
	res.contentType('text/javascript');
	res.sendfile('./js/'+req.params.page);
});

// Nivel de todos los equipos
app.get('/equipo', function (req, res) {
	res.contentType('application/json');
	res.send(teams);
});

// Nivel de todos los jugadores
app.get('/jugador', function (req, res) {
	res.contentType('application/json');
	res.send(players);
});

// Creación de un equipo
app.put('/equipo/:id/:nombre', function( req,res ) {
	// Nuevo en el objeto teams
	teams[req.params.id] = {
		name: req.params.nombre, nj: 0
		};
	res.send("Se ha introducido un nuevo equipo: "+req.params.nombre);
});

// Creación de un jugador
app.put('/jugador/:id/:nombre/:pos/:idT', function( req,res ) {
	// Nuevo en el objeto players
	players[req.params.id] = {
		name: req.params.nombre,
		pos: req.params.pos,
		team: teams[req.params.idT].name
		};
	// Incremento contador jugadores
	teams[req.params.idT].nj++;
	res.send("Se ha introducido un nuevo jugador: "+req.params.id);
});

// Nivel de Jugador/id
app.get('/jugador/:id', function (req, res) {
	res.contentType('application/json');
	res.send(players[req.params.id]);
});

// Nivel de Equipo/id
app.get('/equipo/:id', function (req, res) {
	res.contentType('application/json');
	res.send(teams[req.params.id]);
});

// Actualización de Jugador
app.post('/jugador/:id/:nombre/:pos/:equipo', function (req, res) {
	players[req.params.id].name = req.params.nombre;
	players[req.params.id].pos = req.params.pos;
	var keys = Object.keys(teams);
	for (var i=0; i<keys.length; i++) {
		if (players[req.params.id].team == teams[keys[i]].name) {
			teams[keys[i]].nj--;
		}
		if (teams[req.params.equipo].name == teams[keys[i]].name) {
			teams[keys[i]].nj++;
		}
	}
	players[req.params.id].team = teams[req.params.equipo].name;
	res.contentType('application/json');
	res.send(players[req.params.id]);
});

// Actualización de Equipo
app.post('/equipo/:id/:nombre', function (req, res) {
	teams[req.params.id].name = req.params.nombre;
	res.send("Se ha modificado un equipo existente: "+req.params.id);
});

// Destrucción de un jugador
app.post('/jugador/del/:id', function (req,res) {
	delete players[req.params.id];
	res.send("Se ha eliminado el jugador: "+req.params.id);
});

// Destrucción de un equipo
app.post('/equipo/del/:id', function (req,res) {
	delete teams[req.params.id];
	res.send("Se ha eliminado el equipo: "+req.params.id);
});

var puerto = 8080;
var ip = 'http://127.0.0.1';

//~ var port = process.env.OPENSHIFT_NODEJS_PORT || 8080 ;
//~ var ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1' ;

app.listen(puerto);
console.log('Server running at '+ip+':'+puerto+'/');

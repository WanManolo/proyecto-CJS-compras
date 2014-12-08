// Include restler
var rest = require('restler');
// URL base del cliente
var url = 'http://127.0.0.1:8080/producto/';

// Para cada producto en la línea de argumentos
process.argv.forEach(function (val, index, array) {
	if ( index > 1 ) {
		
		rest.get(url+val).on('complete', function(data){
			var flag = false;
			// Comprobamos si ya se ha introducido el producto
			if (data != "undefined") {
				flag = true;
			}
			else {
				flag = false;
			}
			// Si no hay, lo creamos
			if (!flag) {
				rest.put(url+val).on('complete', function(data) {
					console.log(data);
				});
			}
			else {
				// Si hay, añadimos 1
				rest.post(url+val).on('complete', function(data) {
					console.log(data);
				});
			}
		});
	}
});

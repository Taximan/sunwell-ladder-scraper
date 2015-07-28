var level = require('level');
var config = require('./config');
var readline = require('readline');

var db = level(config.DATA_SAVE_LOCATION);
var reader = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

var keys = [];


console.log('searching for entries');
db.createKeyStream()
	.on('data', function(key) {
		keys.push(key);
	})
	.on('end', function() {
		console.log('got: ', keys);

		reader.question('enter valid key to display: ', function(key) {
			db.get(key, function(err, val) {
				if(err) console.log('couldn\'t recive key.');
				else console.log(val);
				reader.close();
			});
		});

	});
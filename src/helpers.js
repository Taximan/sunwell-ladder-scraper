var request = require('request');

var exp = {};


exp.requestAsync = function requestAsync(url) {
	return new Promise(function(resolve, reject) {
		request(url, function(err, res) {
			if(err) reject(new Error(err));
			else resolve(res);
		});
	});
};


module.exports = exp;
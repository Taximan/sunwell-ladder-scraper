var co = require('co');
var cheerio = require('cheerio');
var requestAsync = require('./helpers').requestAsync;

module.exports = co.wrap(function* getLadder(url){
	var sunwellHtml = (yield requestAsync(url)).body;
	var $ = cheerio.load(sunwellHtml);

	var tbl = $('table#rankingtable tr').get().map(function(row) {
	  return $(row).find('td').get().map(function(cell) {
	    return $(cell).html();
	  });
	});

	// the first record is from the table headers
	// and is therefore removed as its not needed. 
	tbl.shift();

	// translate raw table array to resonable array of objects
	var ladderData = tbl.map(function(row) {
		var res = {};
		var row2$ = cheerio.load(row[2]);
		
		res.rank = row[0];
		res.faction = row[1].slice(-10) === 'ally.jpg">' ? 'A' : 'H';
		res.href = row2$('a').attr('href');
		res.name = row2$('a').text();
		res.win = row[3];
		res.lose = row[4];
		res.rating = row[5];

		return res;
	});

	return ladderData;
});
var co = require('co');
var cheerio = require('cheerio');
var assign = require('object-assign');

var requestAsync = require('./helpers').requestAsync;
var SUNWELL_BASE_URL = require('../config').SUNWELL_BASE_URL;

module.exports = co.wrap(function* getTeams(ladder) {
	var reqs = ladder.map(function(ladderRow) {
		return requestAsync(SUNWELL_BASE_URL + ladderRow.href).then(function(raw) {
			return raw.body;
		});
	});

	var teamHtmls = yield Promise.all(reqs);

	var teams = teamHtmls.map(function(teamHtml) {
		var extractor = /rows\[\d\]\s=\s\{(.+?)\}/g;
		var match, teamMate;
		var teamMates = [];

		while(match = extractor.exec(teamHtml)) {
			// todo: less evaly method. 
			eval('teamMate = { ' + match[1] + ' }');
			teamMates.push(teamMate);
		};

		return teamMates;

	});

	return teams;
});
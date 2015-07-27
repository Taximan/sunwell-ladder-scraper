var co = require('co');
var level = require('level');

var config = require('./config');
var getLadder = require('./src/getLadder');
var getTeams = require('./src/getTeams');

co(function* main() {
	process.stdout.write('getting the ladder...');
	var ladder = yield {
		twos: getLadder(config.SUNWELL_TWOS_URL),
		threes: getLadder(config.SUNWELL_THREES_URL)
	};
	process.stdout.write('DONE \n');

	process.stdout.write('extrating the teams from the ladder...')
	var teams = yield {
		twos: getTeams(ladder.twos),
		threes: getTeams(ladder.threes)
	};
	process.stdout.write('DONE \n');

	

});
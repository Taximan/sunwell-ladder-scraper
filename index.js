var co = require('co');
var level = require('level');

var config = require('./config');
var getLadder = require('./src/getLadder');
var getTeams = require('./src/getTeams');
var mergeTeamData = require('./src/mergeTeamData');

var db = level('./saved/' + (+ new Date));

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
	
	process.stdout.write('preping data for db to write...');
	var dataTobeSaved = JSON.stringify(mergeTeamData(ladder, teams));
	process.stdout.write('DONE \n');
	
	process.stdout.write('writing to db...');
	db.put('ladder', dataTobeSaved, function(err) {
		if(err) {
			console.log('uhh some erroz: ', err);
			return;
		}	

		process.stdout.write('DONE\n');
	});
	
});
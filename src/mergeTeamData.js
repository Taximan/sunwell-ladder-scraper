module.exports = function mergeTeamData(ladder, teams) {
	var res = {};

	for(laddType in ladder) {
		if(ladder.hasOwnProperty(laddType) && teams.hasOwnProperty(laddType)) {
			res[laddType] = ladder[laddType].map(function(laddRow, index) {
				teams[laddType][index].push(laddRow);
				return teams[laddType][index];
			});
		}
	};

	return res;
};


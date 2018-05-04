var Q = require("q");

module.exports = function runQueue(queue) {
	var result = Q.resolve();
	var results = [];

	queue.forEach(function(update, i) {
		result = result.then(function(response) {
			if (i > 0) {
				results.push(response);
			}

			return update(i);
		});
	});

	return result.then(function(response) {
		results.push(response);

		return results;
	}, function(err) {
		return Q.reject({
			err: err,
			results: results,
		});
	});
};

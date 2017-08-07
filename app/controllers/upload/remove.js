var request = require("request");
var Promise = require("pinkie");

var env = require("../../config");

module.exports = function(assetId) {
	return new Promise(function(resolve, reject) {
		// Set options
		var options = {
			method: "delete",
			url: env.digitalAssets.target + "/api/assets/" + assetId + "?userId=" + env.digitalAssets.userId,
			headers: {
				apiKey: env.digitalAssets.apiKey,
			},
			json: true,
		};

		request(options, function(err, data, body) {
			if (data.statusCode === 204 || data.statusCode === 404) {
				resolve();
			} else {
				reject(body);
			}
		});
	});
};

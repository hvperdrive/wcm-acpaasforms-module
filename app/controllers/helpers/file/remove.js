var request = require("request");
var Promise = require("pinkie");

var variablesHelper = require("../../../helpers/variables");

module.exports = function(assetId) {
	return new Promise(function(resolve, reject) {
		variablesHelper().then(function(variables) {
			var env = _.get(variables, "digitalAssets.variables");

			if (!env) {
				reject({
					status: 500,
					message: "No variables available",
				});
			}

			// Set options
			var options = {
				method: "delete",
				url: env.target + "/api/assets/" + assetId + "?userId=" + env.userId,
				headers: {
					apiKey: env.apiKey,
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
	});
};

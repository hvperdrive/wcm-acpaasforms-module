var request = require("request");
var Promise = require("pinkie");

var variablesHelper = require("../../../helpers/variables");

module.exports = function(assetId, mediaFileId) {
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
				method: "get",
				url: env.target + "/api/assets/" + assetId + "/mediafiles/" + mediaFileId + "/url?userId=" + env.userId,
				headers: {
					apiKey: env.apiKey,
				},
				json: true,
			};

			request(options, function(err, data, body) {
				if (data.statusCode === 200) {
					resolve({
						assetId: assetId,
						mediafileId: mediaFileId,
						thumbnail: body.thumbnailUrl,
						full: body.mediafileDownloadUrl.replace("/download/", "/media/"),
					});
				} else {
					reject(body);
				}
			});
		});
	});
};

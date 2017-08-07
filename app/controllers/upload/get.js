var request = require("request");
var Promise = require("pinkie");
var env = require("../../config");

module.exports = function(assetId, mediaFileId) {
	return new Promise(function(resolve, reject) {
		// Set options
		var options = {
			method: "get",
			url: env.digitalAssets.target + "/api/assets/" + assetId + "/mediafiles/" + mediaFileId + "/url",
			headers: {
				apiKey: env.digitalAssets.apiKey,
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
};

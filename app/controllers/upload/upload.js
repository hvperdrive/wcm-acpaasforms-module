var Promise = require("pinkie");
var request = require("request");
var fs = require("fs");

var variablesHelper = require("../../helpers/variables");
var helpers = require("./helpers");
var fileHelpers = require("./helpers").file;

var quotaReached = function(resp) {
	return Object(resp) === resp && resp.hasOwnProperty("Messages") && resp.Messages.length && resp.Messages[0].hasOwnProperty("Message") && resp.Messages[0].Message.indexOf("Upload failed, not enough free quota") >= 0;
};

module.exports = function(item) {
	return new Promise(function(resolve, reject) {
		var env = variablesHelper().digitalAssets.variables;

		var options = {
			method: "post",
			url: env.target + "/api/mediafiles",
			headers: {
				apiKey: env.apiKey,
				"Content-Type": "multipart/form-data",
			},
			formData: {
				userId: env.userId,
				file: fs.createReadStream(item.path),
				generateThumbnail: String(fileHelpers.isImage(item.mimetype)),
				returnThumbnailUrl: String(fileHelpers.isImage(item.mimetype)),
			},
			json: true,
		};

		request(options, function(err, data, body) {
			if (!err && data.statusCode === 200 && body.hasOwnProperty("assetId") && body.hasOwnProperty("mediafileId")) {
				resolve({
					assetId: body.assetId,
					mediafileId: body.mediafileId,
					thumbnail: helpers.link(body.links, "thumbnail"),
					full: helpers.link(body.links, "download"),
				});
			} else {
				// Update status code to 402 if the quota is reached
				if (quotaReached(body)) {
					data.statusCode = 402;
				}

				if (data) {
					data.statusCode = data.statusCode || 500;
				} else {
					data = {
						statusCode: 500,
					};
				}

				reject({
					status: data.statusCode,
					message: "Unable to upload image to the asset server.",
				});
			}
		});
	});
};

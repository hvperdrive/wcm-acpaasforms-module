var _ = require("lodash");
var Promise = require("pinkie");
var request = require("request");
var fs = require("fs");

var variablesHelper = require("../../../helpers/variables");
var runQueue = require("../../../helpers/queue");
var fileHelpers = require("../../../helpers/file");
var removeFile = require("./remove");

var quotaReached = function(resp) {
	return Object(resp) === resp && resp.hasOwnProperty("Messages") && resp.Messages.length && resp.Messages[0].hasOwnProperty("Message") && resp.Messages[0].Message.indexOf("Upload failed, not enough free quota") >= 0;
};

function uploadFile(file) {
	return new Promise(function(resolve, reject) {
		variablesHelper().then(function(variables) {
			var env = _.get(variables, "digitalAssets.variables");

			if (!env) {
				reject({
					status: 500,
					message: "No variables available",
				});
			}

			var options = {
				method: "post",
				url: env.target + "/api/mediafiles",
				headers: {
					apiKey: env.apiKey,
					"Content-Type": "multipart/form-data",
				},
				formData: {
					userId: env.userId,
					file: fs.createReadStream(file.path),
					generateThumbnail: String(fileHelpers.isImage(file.mimetype)),
					returnThumbnailUrl: String(fileHelpers.isImage(file.mimetype)),
				},
				json: true,
			};

			request(options, function(err, data, body) {
				if (!err && data.statusCode === 200 && body.hasOwnProperty("assetId") && body.hasOwnProperty("mediafileId")) {
					resolve({
						assetId: body.assetId,
						mediafileId: body.mediafileId,
						thumbnail: fileHelpers.link(body.links, "thumbnail"),
						full: fileHelpers.link(body.links, "download"),
					});
				} else {
					reject({
						status: quotaReached(body) ? 402 : _.get(data, "statusCode", 500),
						message: "Unable to upload image to the asset server.",
					});
				}
			});
		});
	});
}

function uploadFiles(files) {
	return runQueue(files.map(function(file) {
		return function() {
			return uploadFile(file);
		};
	})).then(function(uploaded) {
		return uploaded;
	}, function(response) {
		// if a file failed to upload, remove already uploaded files
		if (response.results.length) {
			return removeFiles(response.results)
				.then(function() {
					// throw the original error
					throw response.err;
				}, function(err) {
					// throw an error if a removal went wrong
					throw err;
				});
		}

		throw response.err;
	});
}

function removeFiles(files) {
	return runQueue(files.map(function(file) {
		return function() {
			return removeFile(file.assetId);
		};
	}));
}

module.exports = function(files) {
	return Array.isArray(files) ? uploadFiles(files) : uploadFile(files);
};

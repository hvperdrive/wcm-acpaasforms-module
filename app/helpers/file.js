var variablesHelper = require("./variables");

module.exports.filename = function filename(originalName) {
	var parts = originalName.split(".");

	return (parts.length > 1 ? parts.slice(0, parts.length - 1) : parts).join(".");
};

module.exports.extension = function extension(filename) {
	var parts = filename.split(".");

	return parts.length > 1 ? "." + parts.pop() : "";
};

module.exports.isImage = function isImage(mimetype) {
	return !!mimetype && mimetype.indexOf("image") >= 0;
};

module.exports.validMimeType = function validMimeType(file) {
	var mimeTypes = variablesHelper().fileUpload.variables.mimeTypes.split(",");

	return mimeTypes.indexOf(file.mimetype) >= 0;
};

module.exports.link = function link(data, type) {
	var result;
	var item = data.find(function(d) {
		return d.rel === type;
	});

	if (item) {
		result = item.href;
	}

	if (type === "download") {
		result = result.replace("/download/", "/media/");
	}

	return result;
};

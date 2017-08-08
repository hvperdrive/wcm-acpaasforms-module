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
}

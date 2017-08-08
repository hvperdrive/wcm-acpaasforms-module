var multer = require("multer");
var fileHelpers = require("./file");

var storage = multer.diskStorage({
	destination: "/tmp",
	filename: function(req, file, cb) {
		cb(null, fileHelpers.filename(file.originalname) + "-" + Date.now() + fileHelpers.extension(file.originalname));
	},
});

module.exports = multer({
	storage: storage,
	limits: {
		fileSize: 512000000,
		files: 5,
	},
	fileFilter: function(req, file, cb) {
		cb(null, fileHelpers.validMimeType(file));
	},
});

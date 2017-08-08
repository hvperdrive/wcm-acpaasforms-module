var multer = require("multer");
var fileHelpers = require("./helpers/file");

var storage = multer.diskStorage({
	destination: "/tmp",
	filename: function(req, file, cb) {
		cb(null, fileHelpers.filename(file.originalname) + "-" + Date.now() + fileHelpers.extension(file.originalname));
	},
});

module.exports = multer({
	storage: storage,
});

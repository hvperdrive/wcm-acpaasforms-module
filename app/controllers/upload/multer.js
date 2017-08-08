var multer = require("multer");

var storage = multer.diskStorage({
	destination: "/tmp",
	filename: function(req, file, cb) {
		cb(null, file.fieldname + "-" + Date.now());
	},
});

module.exports = multer({
	storage: storage,
});

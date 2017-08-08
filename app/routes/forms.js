require("rootpath")();

var multer = require("../helpers/multer");
var verifyLogin = require("../helpers/auth").verifyLogin;
var formController = require("../controllers/forms");

// Get the configuration of the WCM
var config = require("config")();
// This is a helper middleware function to check if the user is logged in
var baseUrl = "/" + config.api.prefix + config.api.version + "acpaasforms";

module.exports = function(app) {
	app.route(baseUrl + "/:form").post(verifyLogin, multer.array("attachments", 5), formController.submit);
};

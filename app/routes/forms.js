const multer = require("../helpers/multer");
const verifyLogin = require("../helpers/auth").verifyLogin;
const formController = require("../controllers/forms");

// Get the configuration of the WCM
const config = require("@wcm/module-helper").getConfig();
// This is a helper middleware function to check if the user is logged in
const baseUrl = "/" + config.api.prefix + config.api.version + "acpaasforms";

module.exports = (app) => {
	app.route(baseUrl + "/:form").post(verifyLogin, multer.array("attachments", 5), formController.submit);
};

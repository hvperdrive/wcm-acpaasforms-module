require("rootpath")();

var formController = require("../controllers/forms");

// Get the configuration of the WCM
var config = require("config")();
// This is a helper middleware function to check if the user is logged in
var ProfileSecurity = require("app/helpers/modules/lib").ProfileSecurity;
// This is a helper middleware function to specify which method is used. This will be used in the PermissionsSecurity function.
// There are four methods available: read, create, update and delete.
var MethodSecurity = require("app/helpers/modules/lib").MethodSecurity;
// This is a helper middleware function generator that returns a middleware function that can be injected into route as seen below.
// The function will check if the user has the right permissions to execute this action.
// You need to specify the operation type that needs to be checked against (in this case it is the operation type specified in our package.json file).
var PermissionsSecurity = require("app/helpers/modules/lib").PermissionsSecurity("members");
// Building the baseUrl based on the configuration. Every API call needs to be located after the api/ route

var baseUrl = "/" + config.api.prefix + config.api.version + "acpaasforms";

module.exports = function(app) {
	app.route(baseUrl + "/:form").post(ProfileSecurity, MethodSecurity.post, PermissionsSecurity, formController.submit);
};

var variablesHelper = require("./helpers/variables");
var formRoutes = require("./routes/forms");
var hooksController = require("./controllers/hooks");

module.exports = function(app, hooks, info) {
	variablesHelper.set(info);
	// Setup hooks
	hooksController(hooks);
	// startup routes
	formRoutes(app);
};

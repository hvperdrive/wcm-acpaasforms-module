const variablesHelper = require("./helpers/variables");
const formRoutes = require("./routes/forms");
const hooksController = require("./controllers/hooks");
const eventsHelper = require("./helpers/events");

module.exports = function(app, hooks, info) {
	variablesHelper.set(info);
	// Setup hooks
	hooksController(hooks);
    // Set events
	eventsHelper.registerEvents();
	// startup routes
	formRoutes(app);
};

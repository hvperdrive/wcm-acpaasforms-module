var listeners = require("../controllers/listeners");

module.exports = function(app, hooks) {
	// Setup listeners
	listeners.start();

	// Setup hooks
	require("../controllers/hooks")(hooks);
};

var variablesHelper = require("../helpers/variables");

var onConfigurationChanged = function onConfigurationChanged() {
	// Reload config
	variablesHelper.reload();
};

var beforeRemove = function beforeRemove() {
	console.log("before remove");
};

var onDisabled = function onDisabled() {
	console.log("on disabled");
};

var beforeDisable = function beforeDisable() {
	console.log("before disable");
};

var onRemoved = function() {
	console.log("on removed");
};

module.exports = function handleHooks(hooks) {
	var myHooks = {
		onConfigurationChanged: onConfigurationChanged,
		beforeRemove: beforeRemove,
		onRemoved: onRemoved,
		onDisabled: onDisabled,
		beforeDisable: beforeDisable,
	};

	Object.assign(hooks, myHooks);
};

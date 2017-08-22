require("rootpath")();
var EventEmitter = require("app/middleware/emitter");
var variablesHelper = require("../helpers/variables");

function registerEvents() {
	EventEmitter.registerEvent("acpaasformsSupportSubmit", "acpaasforms");
	EventEmitter.registerEvent("acpaasformsFeatureRequestSubmit", "acpaasforms");
}

function unregisterEvents() {
	EventEmitter.unRegisterEvent("acpaasformsSupportSubmit", "acpaasforms");
	EventEmitter.unRegisterEvent("acpaasformsFeatureRequestSubmit", "acpaasforms");
}

var onConfigurationChanged = function onConfigurationChanged() {
	// Reload config
	variablesHelper.reload();
};

var onLoadComplete = function onLoadComplete() {
	registerEvents();
};

var onEnabled = function onEnabled() {
	registerEvents();
};

var onDisabled = function onDisabled() {
	unregisterEvents();
};

var onRemoved = function onRemoved() {
	unregisterEvents();
};

module.exports = function handleHooks(hooks) {
	var myHooks = {
		onConfigurationChanged: onConfigurationChanged,
		onEnabled: onEnabled,
		onDisabled: onDisabled,
		onRemoved: onRemoved,
		onLoadComplete: onLoadComplete,
	};

	Object.assign(hooks, myHooks);
};

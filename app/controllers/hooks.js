require("rootpath")();
var EventEmitter = require("app/middleware/emitter");

function registerEvents() {
	EventEmitter.registerEvent("supportSubmit", "acpaasforms");
	EventEmitter.registerEvent("acpaasformsFeatureRequestSubmit", "acpaasforms");
}

function unregisterEvents() {
	EventEmitter.unRegisterEvent("supportSubmit", "acpaasforms");
	EventEmitter.unRegisterEvent("featureRequestSubmit", "acpaasforms");
}

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
		onEnabled: onEnabled,
		onDisabled: onDisabled,
		onRemoved: onRemoved,
		onLoadComplete: onLoadComplete,
	};

	Object.assign(hooks, myHooks);
};

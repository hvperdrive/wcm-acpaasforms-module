const EventEmitter = require("@wcm/module-helper").emitter;

module.exports.registerEvents = () => {
	EventEmitter.registerEvent("acpaasformsSupportSubmit", "acpaasforms");
	EventEmitter.registerEvent("acpaasformsFeatureRequestSubmit", "acpaasforms");
};

module.exports.unregisterEvents = () => {
	EventEmitter.unRegisterEvent("acpaasformsSupportSubmit", "acpaasforms");
	EventEmitter.unRegisterEvent("featureRequestSubmit", "acpaasforms");
};

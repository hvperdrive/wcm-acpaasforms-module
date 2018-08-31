const eventsHelper = require("../helpers/events");

const onEnabled = () => {
	eventsHelper.registerEvents();
};

const onDisabled = () => {
	eventsHelper.unregisterEvents();
};

const onRemoved = () => {
	eventsHelper.unregisterEvents();
};

module.exports = (hooks) => Object.assign(hooks, {
	onEnabled: onEnabled,
	onDisabled: onDisabled,
	onRemoved: onRemoved,
});


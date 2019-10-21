const eventsHelper = require("../helpers/events");

const onLoadComplete = () => {
	eventsHelper.registerEvents();
};

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
	onEnabled,
	onDisabled,
	onRemoved,
	onLoadComplete,
});


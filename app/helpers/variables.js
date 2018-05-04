var Q = require("q");

var VariableHelper = require("@wcm/module-helper").variables;

var packageInfo = null;

module.exports = function() {
	if (packageInfo === null) {
		return Q.reject("No package info!");
	}

	return VariableHelper.getAll(packageInfo.name, packageInfo.version)
		.catch(function onError(responseError) {
			console.error("Failed getting variables (eventhandler module)");
			console.error(responseError);
		});
};

module.exports.set = function set(info) {
	packageInfo = info;
};

module.exports.get = function get() {
	return packageInfo;
};


const Q = require("q");

const VariableHelper = require("@wcm/module-helper").variables;

let packageInfo = null;

const setPackageInfo = (info) => {
	packageInfo = info || packageInfo;
};

module.exports = (info) => {
	setPackageInfo(info);

	if (packageInfo === null) {
		return Q.reject("No package info!");
	}

	return VariableHelper.getAll(packageInfo.name, packageInfo.version)
		.catch(function onError(responseError) {
			console.error("Failed getting variables (eventhandler module)");
			console.error(responseError);
		});
};


module.exports.setPackageInfo = (info) => setPackageInfo(info);
module.exports.getPackageInfo = () => packageInfo;

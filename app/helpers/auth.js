require("rootpath")();
var getModuleMethod = require("app/helpers/modules/lib").getModuleMethod;

module.exports.verifyLogin = function verifyLogin(req, res, next) {
	var memberAccess = getModuleMethod("members", "MemberAccessMiddleware");

	if (memberAccess && typeof memberAccess.hard === "function") {
		return memberAccess.hard(req, res, next);
	}

	return next();
};

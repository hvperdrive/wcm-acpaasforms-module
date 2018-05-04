require("rootpath")();

var _ = require("lodash");

var getModule = require("@wcm/module-helper").getModule;

module.exports.verifyLogin = function verifyLogin(req, res, next) {
	return getModule("@wcm/members")
		.then(function(mod) {
			if (typeof _.get(mod, "memberAccessMiddleware.hard") !== "function") {
				return next();
			}

			return mod.memberAccessMiddleware.hard(req, res, next);
		}, function() {
			return next();
		});
};

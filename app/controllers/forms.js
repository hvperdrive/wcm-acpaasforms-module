var handlers = {
	support: require("../helpers/support"),
	feature: require("../helpers/feature"),
};

function getFormHandler(form) {
	return handlers.hasOwnProperty(form) ? handlers[form] : null;
}

module.exports.submit = function submit(req, res) {
	var formHandler = getFormHandler(req.params.form);

	if (!formHandler) {
		return res.status(400).json({
			err: "Unknown form type.",
		});
	}

	formHandler.submit(req.body)
		.then(function(result) {
			res.status(200).json(result);
		}, function(err) {
			res.status(500).json({
				err: err,
			});
		});
};

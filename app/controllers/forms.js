var _ = require("lodash");

var formHandler = require("./helpers/form");

function validateFormData(formData) {
	return ["product", "subject", "message"].reduce(function(errs, field) {
		if (!formData || !formData.hasOwnProperty(field)) {
			errs = _.assign({}, { field: "Missing " + field });
		}

		return errs;
	}, null);
}

module.exports.submit = function submit(req, res) {
	var validationErrors = validateFormData(req.body);

	if (validationErrors) {
		return res.status(400).json(validationErrors);
	}

	formHandler.submit(req.body, req.params.form)
		.then(function(result) {
			res.status(200).json(result);
		}, function(errResponse) {
			res.status(_.get(errResponse, "statusCode", 500)).json(_.get(errResponse, "err", errResponse));
		});
};

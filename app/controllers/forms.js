require("rootpath")();
const _ = require("lodash");
const toObj = require("form-data-to-object").toObj;

const EventEmitter = require("@wcm/module-helper").emitter;
const formHandler = require("./helpers/form");

function validateFormData(formData) {
	return ["product", "subject", "message"].reduce(function(errs, field) {
		if (!formData || !formData.hasOwnProperty(field)) {
			errs = _.assign({}, { field: "Missing " + field });
		}

		return errs;
	}, null);
}

function formEvent(form) {
	return "acpaasforms.acpaasforms" + _.upperFirst(_.camelCase(form)) + "Submit";
}

module.exports.submit = function submit(req, res) {
	const formData = toObj(req.body);
	const validationErrors = validateFormData(formData);

	if (validationErrors) {
		return res.status(400).json(validationErrors);
	}

	formHandler.submit(formData, req.files, req.params.form, req.member)
		.then(function(result) {
			EventEmitter.emit(formEvent(req.params.form), result);
			res.status(200).json(result);
		}, function(errResponse) {
			res.status(_.get(errResponse, "statusCode", 500)).json(_.get(errResponse, "err", errResponse));
		});
};

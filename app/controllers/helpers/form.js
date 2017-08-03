require("rootpath")();
var Q = require("q");

var ContentModel = require("app/models/content");
var formTypes = require("../../fixtures/forms");

function productExists(uuid) {
	return ContentModel
		.findOne({ uuid: uuid }, { uuid: 1 })
		.lean()
		.exec()
		.then(function(response) {
			if (!response) {
				throw {
					statusCode: 404,
					err: "Product does not exist!",
				};
			}

			return response;
		}, function(err) {
			throw err;
		});
}

function getFormType(type) {
	var types = {
		support: "productForm",
		feature: "productForm",
	};

	return formTypes[types[type]];
}

function parseForm(formData, type) {
	return {
		fields: {
			subject: formData.subject,
			message: formData.message,
			product: formData.product,
			type: type,
		},
		meta: {
			label: formData.subject,
			publishData: new Date().toISOString(),
			status: "PUBLISHED",
			published: true,
			activeLanguages: ["nl"],
			contentType: getFormType(type)._id.toString(),
		},
	};
}

function handleAttachments(type, formData, attachments) {
	return Q.resolve(formData);
}

function createForm(type, formData) {
	return ContentModel.create(parseForm(formData, type));
}

module.exports.submit = function(formData, attachments, type) {
	return productExists(formData.product)
		.then(handleAttachments.bind(null, type, formData, attachments))
		.then(createForm.bind(null, type));
};
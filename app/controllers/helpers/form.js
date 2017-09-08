require("rootpath")();
var Q = require("q");
var _ = require("lodash");

var ContentModel = require("app/models/content");
var formTypes = require("../../fixtures/forms");
var fileHelper = require("./file");

function productExists(uuid) {
	return ContentModel
		.findOne({ uuid: uuid }, { uuid: 1, "fields.externalKey": 1 })
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
		"feature-request": "productForm",
	};

	return formTypes[types[type]];
}

function parseForm(formData, type, product, user) {
	return {
		fields: {
			subject: formData.subject,
			message: formData.message,
			product: formData.product,
			externalKey: _.get(product, "fields.externalKey", ""),
			name: _.get(user, "data.fullName", ""),
			email: _.get(user, "data.email", ""),
			type: type,
			attachments: formData.attachments.map(function(attachment) {
				return {
					value: JSON.stringify(attachment, null, 2),
				};
			}),
		},
		meta: {
			label: "User form: " + formData.subject,
			publishData: new Date().toISOString(),
			status: "PUBLISHED",
			published: true,
			activeLanguages: ["nl"],
			contentType: getFormType(type)._id.toString(),
		},
	};
}

function handleAttachments(type, formData, attachments) {
	return fileHelper.upload(attachments)
		.then(function(files) {
			return _.assign(formData, {
				attachments: files,
			});
		}, function(err) {
			throw err;
		});
}

function createForm(type, product, user, formData) {
	return ContentModel.create(parseForm(formData, type, product, user));
}

module.exports.submit = function(formData, attachments, type, user) {
	return productExists(formData.product)
		.then(function(product) {
			return handleAttachments(type, formData, attachments)
				.then(createForm.bind(null, type, product, user));
		});
};

require("rootpath")();
var _ = require("lodash");

var ContentModel = require("app/models/content");
var formTypes = require("../../fixtures/forms");
var fileHelper = require("./file");

function productExists(uuid) {
	return ContentModel
		.findOne({ uuid: uuid }, {
			"_id": 0,
			"uuid": 1,

			"fields.externalKey": 1,
			"fields.title": 1,
			"fields.intro": 1,

			"meta.label": 1,
			"meta.safeLabel": 1,
			"meta.slug": 1,
			"meta.created": 1,
			"meta.lastModified": 1,
		})
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
			productInfo: product,
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

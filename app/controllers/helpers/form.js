require("rootpath")();
const _ = require("lodash");

const ContentModel = require("app/models/content");
const formTypes = require("../../fixtures/forms");
const fileHelper = require("./file");

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
		.then((response) => {
			if (!response) {
				throw {
					statusCode: 404,
					err: "Product does not exist!",
				};
			}

			return response;
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
			attachments: formData.attachments.reduce((acc, attachment) => {
				if (!attachment) {
					return acc;
				}

				return acc.concat({
					value: JSON.stringify(attachment, null, 2)
				});
			}, []),
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
		.then((files) => {
			return _.assign(formData, {
				attachments: files,
			});
		});
}

function createForm(type, product, user, formData) {
	return ContentModel.create(parseForm(formData, type, product, user));
}

module.exports.submit = (formData, attachments, type, user) => {
	return productExists(formData.product)
		.then((product) => {
			return handleAttachments(type, formData, attachments)
				.then(createForm.bind(null, type, product, user));
		});
};

require("rootpath")();

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

function createForm(formData, type) {
	try {
		var types = {
			support: "productForm",
			feature: "productForm"
		};
		var formType = formTypes[types[type]];
		var form = {
			fields: {
				subject: formData.subject,
				message: formData.message,
				product: {
					value: formData.product,
				}
			},
			meta: {
				label: formData.subject,
				publishData: new Date().toISOString(),
				status: "PUBLISHED",
				published: true,
				activeLanguages: ["nl"],
				contentType: formType._id.toString(),
			},
		};

		console.log("FORM:", form);

		return ContentModel
			.create(form)
			.then(function(item) {
				console.log("CREATED ITEM:", item);
				return item;
			}, function(err) {
				console.log("CREATE ERROR:", err);
				throw err;
			});
	} catch (e) {
		console.log("ERR", e);
	}
}

module.exports.submit = function(formData, type) {
	return productExists(formData.product)
		.then(function () {
			console.log("PRODUCT EXISTS");
			return createForm(formData, type);
		}, function(err) {
			throw err;
		});
};

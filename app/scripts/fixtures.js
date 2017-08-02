"use strict";

// Set default envs
process.env.NODE_ENV = process.env.NODE_ENV || "development";
process.env.APP = process.env.APP || "default";
// Set envs to lowercase
process.env.NODE_ENV = process.env.NODE_ENV.toLowerCase();
process.env.APP = process.env.APP.toLowerCase();

require("rootpath")();
var Q = require("q");
var _ = require("lodash");
var mongoose = require("mongoose");

function getMongoPath() {
	var argvIndex = _.findIndex(process.argv, function(val) {
		return val.indexOf("mongodb://") !== -1;
	});

	if (argvIndex < 0 || argvIndex >= process.argv.length) {
		return null;
	}

	return process.argv[argvIndex];
}

function connect() {
	var mongoPath = getMongoPath();

	if (!mongoPath) {
		console.log("No mongo path specified. Please use --mongo [mongoPath]");
		return process.exit(1);
	}

	try {
		// Start mongoose connection
		mongoose.connect(mongoPath);
		mongoose.Promise = Q.Promise;
	} catch (err) {
		console.log("MONGOOSE CONNECTION ERROR", err);
		process.exit(1);
	}
}

function runQueue(queue) {
	var result = Q.resolve();

	queue.forEach(function(update, i) {
		result = result.then(function() {
			return update(i);
		});
	});

	return result;
}

function updateContentItem(type, model) {
	return model.findOneAndUpdate({
		uuid: type.uuid,
	}, type, {
		upsert: true,
		new: true,
	})
	.exec();
}

function updatePermissions(type, model) {
	return model
		.find({ isAdmin: true })
		.exec()
		.then(function(items) {
			var typeId = type._id.toString();

			return runQueue(items.map(function(item) {
				return function() {
					var typeIndex = _.findIndex(item.contentTypes, { type: typeId });

					typeIndex = typeIndex > 0 ? typeIndex : item.contentTypes.length - 1;

					item.contentTypes.splice(typeIndex, 1, {
						type: typeId,
						permissions: {
							delete: true,
							update: true,
							read: true,
							create: false,
						},
					});

					return model.update({ _id: item._id }, item);
				};
			}));
		}, function(err) {
			throw err;
		});
}

function updateForms() {
	connect();

	var ContentTypeModel = require("app/models/contentType");
	var RoleModel = require("app/models/role");
	var forms = require("../fixtures/forms");
	var formTypes = Object.keys(forms);

	runQueue(formTypes.map(function() {
		return function(i) {
			var type = forms[formTypes[i]];

			return updateContentItem(type, ContentTypeModel).then(updatePermissions.bind(null, type, RoleModel));
		};
	}))
	.then(function() {
		console.log("ALL TYPES UPDATED");
		process.exit(0);
	}, function(err) {
		console.log(err);
		process.exit(1);
	});
}

updateForms();

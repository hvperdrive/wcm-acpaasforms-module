"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var uuid = require("node-uuid");

var FormSchema = new Schema({
	uuid: {
		type: String,
		default: uuid,
		required: true,
		index: true,
	},
	fields: {},
	meta: {
		label: {
			type: String,
			required: true,
		},
		slug: {
			type: String,
			required: true,
		},
		deleted: {
			type: Boolean,
			required: true,
			default: false,
		},
		description: {
			type: String,
			required: true,
		},
	},
	versions: [],
}, { strict: false });

FormSchema.set("collection", "forms");
module.exports = mongoose.model("Form", FormSchema);

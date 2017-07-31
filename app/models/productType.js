"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Mixed = Schema.Types.Mixed;
var uuid = require("node-uuid");

var ProductFieldSchema = new Schema({
	uuid: {
		type: String,
		default: uuid,
		required: true,
		index: true,
	},
	key: {
		type: String,
		required: true,
		unique: true,
		index: true,
	},
	label: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		required: true,
	},
	dataType: {
		type: String,
		required: true,
	},
	validation: {
		type: Mixed,
	},
	isMultiple: {
		type: Boolean,
		required: true,
		default: false,
	},
	isTranslate: {
		type: Boolean,
		required: true,
		default: false,
	},
	isQueryable: {
		type: Boolean,
		required: true,
		default: false,
	},
});

ProductFieldSchema.set("collection", "fieldtypes");
module.exports = mongoose.model("ProductFieldType", ProductFieldSchema);

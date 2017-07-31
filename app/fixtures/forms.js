"use strict";

var ObjectId = require("mongoose").Types.ObjectId;

// jscs:disable maximumLineLength

// exports.FieldType = {
// 	product: {
// 		key: "product",
// 		label: "Product",
// 		type: "text",
// 		dataType: "text",
// 		isQueryable: false,
// 		isTranslate: false,
// 		isMultiple: false,
// 		operators: [],
// 		uuid: "3c4be04e-1234-4822-80d4-e3bcab21904e",
// 	},
// };

exports.Form = {
	featureForm: {
		_id: ObjectId("58be333e0518d34c284c42e6"),
		versions: [],
		fields: [{
		// 	"dataType": "product",
		// 	label: "Product",
		// 	type: "text",
		// 	validation: {
		// 		required: true,
		// 	},
		// 	_id: "title",
		// 	indexed: false,
		// 	multiLanguage: false,
		// 	uuid: "3c4becce-7121-4845-8094-e3bc20e1904e",
		// }, {
			"dataType": "text",
			label: "Subject",
			type: "text",
			validation: {
				required: true,
			},
			_id: "subject",
			indexed: false,
			multiLanguage: false,
			uuid: "3c2becce-7191-4845-8034-e3bc20e1a04e",
		}, {
			"dataType": "text",
			label: "Message",
			type: "text",
			validation: {
				required: true,
			},
			_id: "message",
			indexed: false,
			multiLanguage: false,
			uuid: "3c2babce-2191-1845-8534-e3bc80e1a04a",
		}, {
			"dataType": "file",
			indexed: false,
			label: "Attachemnts",
			type: "file",
			min: 1,
			max: 10,
			multiLanguage: false,
			validation: {
				required: false,
			},
			uuid: "59abbc49-fe9a-42b7-97dc-31dd0304a202",
		}],
		meta: {
			deleted: false,
			slug: "feature",
			description: "ACPaaS Portal Feature Form",
			label: "Feature Form",
		},
		uuid: "3925761e-13ad-468b-af31-75049557971e",
		__v: 0,
	},
};

"use strict";

var ObjectId = require("mongoose").Types.ObjectId;

var productForm = {
	"_id": ObjectId("597f38a7a8fe2f5c348c62d4"),
	"versions": [],
	"fields": [
		{
			"_id": "product",
			"validation": {
				"required": true,
			},
			"type": "content-reference",
			"label": "Product",
			"dataType": "object",
			"indexed": false,
			"multiLanguage": false,
			"options": [],
			"max": 1,
			"min": 1,
			"taxonomyLists": [],
			"defaultValue": null,
			"data": [
				"d257cbc5-c438-4c25-8a77-7ed214cd5a10",
			],
			"uuid": "c6e7aff1-b191-4496-8b3b-6adb3456a4e5",
		},
		{
			"_id": "type",
			"validation": {
				"required": true,
			},
			"type": "select",
			"label": "Type",
			"dataType": "option",
			"indexed": false,
			"multiLanguage": false,
			"options": [{
				"label": "Support",
				"key": "support",
				"_id": "598195599fbf886bc9d1876e",
			}, {
				"label": "Feature Request",
				"key": "feature-request",
				"_id": "598195599fbf886bc9d1876d",
			}],
			"uuid": "106560ae-4cf1-4fe5-8a23-030f85bee18e",
		},
		{
			"_id": "externalKey",
			"validation": {
				"required": true,
			},
			"type": "text",
			"label": "JIRA project key",
			"operators": [],
			"dataType": "string",
			"indexed": false,
			"multiLanguage": false,
			"options": [],
			"max": 1,
			"min": 1,
			"taxonomyLists": [],
			"uuid": "8fd1f970-b72e-4e6d-887c-e8de86901d22"
		},
		{
			"_id": "name",
			"validation": {
				"required": true,
			},
			"type": "text",
			"label": "Naam",
			"operators": [],
			"dataType": "string",
			"indexed": false,
			"multiLanguage": false,
			"options": [],
			"max": 1,
			"min": 1,
			"taxonomyLists": [],
			"uuid": "1d40aef2-a4af-4dcc-8cf8-1f81e2c80da2"
		},
		{
			"_id": "email",
			"validation": {
				"required": false,
			},
			"type": "email",
			"label": "JIRA project key",
			"operators": [],
			"dataType": "string",
			"indexed": false,
			"multiLanguage": false,
			"options": [],
			"max": 1,
			"min": 1,
			"taxonomyLists": [],
			"uuid": "da2a6ab6-dd4b-4745-8442-6d3e9d06d41e"
		},
		{
			"_id": "subject",
			"validation": {
				"required": true,
			},
			"type": "text",
			"label": "Subject",
			"operators": [],
			"dataType": "string",
			"indexed": false,
			"multiLanguage": false,
			"options": [],
			"max": 1,
			"min": 1,
			"taxonomyLists": [],
			"uuid": "0bd85853-e46d-4a0c-90eb-7808c5359b23",
		},
		{
			"_id": "message",
			"validation": {
				"required": true,
			},
			"type": "textarea",
			"label": "Message",
			"operators": [],
			"dataType": "string",
			"indexed": false,
			"multiLanguage": false,
			"options": [],
			"max": 1,
			"min": 1,
			"taxonomyLists": [],
			"uuid": "a6d876ab-5d89-4106-be2e-edef67f9233d",
		},
		{
			"_id": "attachments",
			"validation": {
				"required": false,
			},
			"type": "textarea",
			"label": "Attachments",
			"dataType": "text",
			"indexed": false,
			"multiLanguage": false,
			"options": [],
			"max": 5,
			"min": 1,
			"taxonomyLists": [],
			"uuid": "5c8bbc49-fe9a-48b7-97dc-31dd6304a202",
		},
	],
	"meta": {
		"label": "ACPaaS Portal Form",
		"safeLabel": "acpaasportal-form",
		"created": "2017-07-31T14:03:19.457Z",
		"lastModified": "2017-08-01T08:39:28.876Z",
		"lastEditor": "59131727b657f739e41014c9",
		"description": "ACPaaS Portal Form",
		"taxonomy": {
			"available": [],
			"fieldType": "Taxonomy",
			"tags": [],
		},
		"hitCount": 0,
		"deleted": false,
		"canBeFiltered": false,
	},
	"uuid": "52ff1516-3690-4b67-9dbd-5911d001099f",
};

module.exports = {
	productForm: productForm,
};

"use strict";

// Set default envs
process.env.NODE_ENV = process.env.NODE_ENV || "development";
process.env.APP = process.env.APP || "default";
// Set envs to lowercase
process.env.NODE_ENV = process.env.NODE_ENV.toLowerCase();
process.env.APP = process.env.APP.toLowerCase();

var path = require("path");
var Q = require("q");
var mongoose = require("mongoose");
var chalk = require("chalk");
var fixtures = require("mongoose-fixtures");
var config = require("config")();

var options;

if (config.server.mongo && config.server.mongo.user && config.server.mongo.pwd) {
	options = {
		user: config.server.mongo.user,
		pass: config.server.mongo.pwd,
		auth: {
			authdb: config.server.mongo.authdb,
		},
	};
}

// Start mongoose connection
mongoose.connect(config.server.mongo.url + "/" + config.server.mongo.db, options);

// Set promise library for Mongoose
mongoose.Promise = Q.Promise;

// Require all models
require("../models")();

// Load fixtures
fixtures.load(path.join(__dirname, "../fixtures"), function(err) {
	console.log(chalk.yellow("Fixtures executed succesfully.")); // eslint-disable-line no-console
	process.exit();
});

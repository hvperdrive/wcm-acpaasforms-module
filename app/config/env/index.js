const fs = require("fs");
const path = require("path");

const env = process.env.HOSTNAME ? "server" : "local";
const envConf = fs.existsSync(path.join(__dirname, env + ".js"));

module.exports = require(`./${envConf ? env : "local"}`);

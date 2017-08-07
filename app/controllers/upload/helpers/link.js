module.exports = function(data, type) {
	var result;
	var item = data.find(function(d) {
		return d.rel === type;
	});

	if (item) {
		result = item.href;
	}

	if (type === "download") {
		result = result.replace("/download/", "/media/");
	}

	return result;
};

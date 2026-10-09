const { marked } = require('marked');

exports.markdownMarkup = (markup) => {
	try {
		return marked.parse(markup);
	} catch (err) {
		throw err;
	}
};


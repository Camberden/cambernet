exports.notifyUser = (req, res, next) => {
	// console.log(req.headers['cmbr-request']);
	// console.log(req.headers['cmbr-request'] === 'regulate');

	try {
		if (req.headers['hx-request']) {
			console.log("HELO");
		} else {
			console.log("NO.")
		}
	} catch (err) {
		console.log("No message " + err.message);
		next();
	};
	next();
};
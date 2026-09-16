const { verifyToken } = require('../services/tokenService');
const cookieParser = require('cookie-parser');

exports.cookieJwtAuth = (req, res, next) => {
	try {
		if (req.cookies.jwt_token) {
			const cook = cookieParser.signedCookie(req.cookies.jwt_token);
			const user = verifyToken(cook);
			if (user) {
				console.log("Accessed @ cookieJwtAuth!");
				req.user = user;
				console.log("User ID: " + user.payload.id);
			}
		} else {
			console.log("Not Accessed.");
			console.log("No token found in cookies.");
			res.sendStatus(401).json({ error: 'Unauthorized: No token provided' });
		}
	} catch (err) {
		console.log("No token or token invalid: " + err.message);
		next();
	};
	next();
};
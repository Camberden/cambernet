const express = require('express');
const router = express.Router();

const pool = require('../config/database');

const { promisify } = require('util');
const fs = require('fs');
const multer = require('multer');
const convert = require('heic-convert');
const { charterDir } = require('../services/charterService');
const { heiconversion } = require('../services/imageService');

const { cookieJwtAuth } = require('../middleware/auth.js');
const { notifyUser } = require('../middleware/notify.js');
const { upload, uploadMiddleware } = require('../middleware/media');


router.post('/upload', upload.single('heic-photo'), function (req, res) {
	if (!req.file) {
		return res.status(400).send('No file uploaded');
	}
	(async () => {
		const inputBuffer = await promisify(fs.readFile)(req.file.path);
		const outputBuffer = await convert({
			buffer: inputBuffer,
			format: 'JPEG',
			quality: 1,
			name: 'temp-photo',
			// % Possibly add 'name' here?
		});

		await promisify(fs.writeFile)(`images/uploads/photo-${Date.now()}.jpg`, outputBuffer);

	})();
	fs.unlink(req.file.path, (err) => {
		if (err) {
			console.error('File cleanup failed:', err);
		} else {
			console.log('Uploaded file cleaned up successfully');
		}
	});
	res.redirect('/');
});

router.get('/uploads', async (req, res, next) => {
	console.log("HELLOOOOO FOLDERS?>?>?")
	try {
		const togetFolder = './images/uploads';
		const fhouwdoughs = fs.readdirSync(togetFolder);
		console.log("fuck the what")
		if (fhouwdoughs) {
			console.warn("What the fuck")
			res.json(fhouwdoughs);
			next();
		}
	} catch (err) {
		console.error("Issue");
		res.next();
	}
});

router.get('/travel-photos', async (req, res, next) => {
	console.log("Travel Photos Access")
	try {
		const togetFolder = './assets/travel-photos';
		const fhouwdoughs = fs.readdirSync(togetFolder);
		console.log("fuck the what")
		if (fhouwdoughs) {
			console.warn("Sending...");
			res.json(fhouwdoughs);
			next();
		}
	} catch (err) {
		console.error("Issue");
		res.next();
	}
});

router.get('/clouds', async (req, res) => {
	if (!req.message) {
		console.log('No message... yet!');
	}
	try {
		const connection = await pool.getConnection();
		console.log("cloud before query");
		const [clouds] = await connection.execute(
			'SELECT cl.id, cl.title, cl.thought, cl.weight, cl.compelled, u.username FROM clouds cl JOIN users u ON cl.user_id = u.id ORDER BY cl.compelled DESC'
		);
		console.log("cloud after query before release");
		connection.release();
		console.log("cloud after release");

		// Parse JSON fields
		const parsedClouds = clouds.map(cloud => ({
			id: cloud.id,
			title: cloud.title,
			thought: cloud.thought,
			weight: cloud.weight,
		}));
		console.log("clouds parsed");

		res.json(parsedClouds);
	} catch (error) {
		console.error('fetch error:', error);
		res.status(500).json({ error: 'Failed to fetch clouds' });
	}
});

router.post('/clouds', cookieJwtAuth, async (req, res) => {

	try {
		const { title, thought, weight } = req.body;
		const user_id = req.user.payload.id;

		if (!title || !thought) {
			return res.status(400).json({ error: 'Title and Thought are required' });
		}

		await pool.getConnection();

		const [result] = await pool.execute(
			'INSERT INTO clouds (user_id, title, thought, weight) VALUES (?, ?, ?, ?)',
			[user_id, title, thought, weight]
		);

		pool.releaseConnection();

		res.json({
			message: 'Cloud created successfully',
			cloudId: result.insertId
		});
	} catch (error) {
		console.error('Cloud creation error:', error);
		res.status(500).json({ error: 'Failed to create cloud' });
	}
});

router.delete('/clouds/:id', cookieJwtAuth, async (req, res) => {
	console.log("Todos API: router.delete(`/:id`) [const { deleteCloudId } = req.params;]");
	pool.releaseConnection();
	try {

		const deleteCloudId = parseInt(req.params.id).toFixed(0);
		const user_id = req.user.payload.id;
		console.log("Fetching delete param:", deleteCloudId);
		console.log("Id type:", typeof deleteCloudId);

		await pool.getConnection();

		// Check ownership
		const [cloudposts] = await pool.execute(
			'SELECT user_id FROM clouds WHERE id = ?',
			[deleteCloudId]
		);

		if (cloudposts.length === 0) {
			pool.releaseConnection();
			return res.status(404).json({ error: 'cloudposts not found' });
		}

		if (cloudposts[0].user_id !== user_id) {
			pool.releaseConnection();
			return res.status(403).json({ error: 'Unauthorized' });
		}

		await pool.execute('DELETE FROM clouds WHERE id = ?', [deleteCloudId]);

		pool.releaseConnection();

		res.send({
			message: '(1) Cloud deleted successfully!',
			user: req.user.payload.username,
		});
	} catch (error) {
		console.error('CloudId delete error:', error);
		res.status(500).json({ error: 'Failed to delete cloudposts' });
	} finally {
		pool.releaseConnection();
	}
});

module.exports = router;
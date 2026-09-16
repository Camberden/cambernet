const express = require('express');
const pool = require('../config/database');
const { cookieJwtAuth } = require('../middleware/auth');

const router = express.Router();
router.post('/', cookieJwtAuth, async (req, res) => {
	try {

		const { newTdInfo } = req.body;
		const user_id = req.user.payload.id;
		console.log(user_id);

		if (!req.user) {
			return res.status(400).json({ error: 'Info required.' });
		}

		await pool.getConnection();

		const [result] = await pool.query(
			'INSERT INTO todos (user_id, info) VALUES (?, ?)',
			[user_id, newTdInfo]
		);

		pool.releaseConnection();

		res.send({
			message: '(1) Todo post created successfully!',
			postId: result.insertId,
			user: req.user,
		});
	} catch (error) {
		console.error('Todo creation error:', error);
		res.status(500).json({ error: 'Failed to create todopost' });
	} finally {
		pool.releaseConnection();
	}
});

router.get('/', async (req, res) => {
	console.log('Todos API: router.get(`/`) [const parsedTodos = todoposts.map(todopost => ({...todopost, }));]');
	pool.releaseConnection();
	if (!req.user) {
		console.log("No user.");
	};

	try {
		await pool.getConnection();

		const [todoposts] = await pool.execute(
			'SELECT td.id, td.info, td.created_at, td.updated_at FROM todos td JOIN users u ON td.user_id = u.id ORDER BY td.created_at DESC'
		);

		pool.releaseConnection();

		// ! Parse JSON fields
		const parsedTodoposts = todoposts.map(todopost => ({
			...todopost,
		}));
		// tags: post.tags ? JSON.parse(post.tags) : []

		res.json(parsedTodoposts);

	} catch (error) {
		console.error('Todo fetch error:', error);
		res.status(500).json({ error: 'Failed to fetch todos' });
	} finally {
		pool.releaseConnection();
	}
});

router.put('/:id', cookieJwtAuth, async (req, res) => {
	pool.releaseConnection();
	try {
		const updateTdId = parseInt(req.params.id).toFixed(0);
		const { updateTdInfo } = req.body;
		const user_id = req.user.payload.id;

		await pool.getConnection();

		// Check ownership
		const [todoposts] = await pool.execute(
			'SELECT user_id FROM todos WHERE id = ?',
			[updateTdId]
		);

		if (todoposts.length === 0) {
			pool.releaseConnection();
			return res.status(404).json({ error: 'todoposts not found' });
		}

		if (todoposts[0].user_id !== user_id) {
			pool.releaseConnection();
			return res.status(403).json({ error: 'Unauthorized' });
		}

		await pool.execute(
			'UPDATE todos SET info = ? WHERE id = ?',
			[updateTdInfo, updateTdId]
		);

		pool.releaseConnection();

		res.send({
			message: '(1) Todo updated successfully!',
			postId: result.insertId,
			user: req.user,
		});
	} catch (error) {
		console.error('todopost update error:', error);
		pool.releaseConnection();
		res.status(500).json({ error: 'Failed to update todopost' });
	} finally {
		pool.releaseConnection();
	}
});

router.delete('/:id', cookieJwtAuth, async (req, res) => {
	console.log("Todos API: router.delete(`/:id`) [const { deleteTdId } = req.params;]");
	pool.releaseConnection();
	try {

		const deleteTdId = parseInt(req.params.id).toFixed(0);
		const user_id = req.user.payload.id;
		console.log("Fetching delete param:", deleteTdId);
		console.log("Id type:", typeof deleteTdId);

		await pool.getConnection();

		// Check ownership
		const [todoposts] = await pool.execute(
			'SELECT user_id FROM todos WHERE id = ?',
			[deleteTdId]
		);

		if (todoposts.length === 0) {
			pool.releaseConnection();
			return res.status(404).json({ error: 'Todopost not found' });
		}

		if (todoposts[0].user_id !== user_id) {
			pool.releaseConnection();
			return res.status(403).json({ error: 'Unauthorized' });
		}

		await pool.execute('DELETE FROM todos WHERE id = ?', [deleteTdId]);

		pool.releaseConnection();

		res.send({
			message: '(1) Todo deleted successfully!',
			user: req.user,
		});
	} catch (error) {
		console.error('Todopost delete error:', error);
		res.status(500).json({ error: 'Failed to delete todopost' });
	} finally {
		pool.releaseConnection();
	}
});

module.exports = router;
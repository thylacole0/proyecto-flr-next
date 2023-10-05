const router = require('express').Router();
const pool = require('../database/db.js');
const authorized = require('../middleware/authorization.js');

router.get('/', authorized, async (req, res) => {
    try {
        // req.user has the payload
        const user = await pool.query(
            "SELECT username FROM users WHERE user_id = $1",
            [req.user]
        );

        res.json(user.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
// import { Router } from 'express';
// import pool from '../database/db.js';
// import bcrypt from 'bcrypt';
// import jwtGenerator from '../utils/jwtGenerator.js';

const Router = require('express');
const pool = require('../database/db.js');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator.js');
const authorized = require('../middleware/authorization.js');

const router = Router();

router.post('/register', async (req, res) => {
try {
    const { username, password, estado_user, tipo_user } = req.body;

    const user = await pool.query("SELECT * FROM users WHERE username = $1", [
        username
    ]);

    // res.json(user.rows);

    if (user.rows.length !== 0) {
        return res.status(401).send('User already exist');
    }

    // Bcryptear la contraseña del usuario
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);

    // Ingresar el nuevo usuario a la base de datos

    const newUser = await pool.query(
        "INSERT INTO users (username, password, estado_user, tipo_user) VALUES ($1, $2, $3, $4) RETURNING *",
        [username, bcryptPassword, estado_user, tipo_user]
    );

    // Generar el JWT token

    const token = jwtGenerator(newUser.rows[0].user_id);

} catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
}
});   

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await pool.query("SELECT * FROM users WHERE username = $1", [
            username
        ]);

        if (user.rows.length === 0) {
            return res.status(401).json('Password or username is incorrect');
        }

        // Comprobar si la contraseña es correcta

        const validPassword = await bcrypt.compare(
            password,
            user.rows[0].password
        );

        if (!validPassword) {
            return res.status(401).json('Password or username is incorrect');
        }

        // Darle el token al usuario

        const token = jwtGenerator(user.rows[0].user_id);

        res.json({ token });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

router.get('/verificacion', authorized,  async (req, res) => {
    try {
        res.json(true);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});


module.exports = router;

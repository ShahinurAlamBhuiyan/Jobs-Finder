// routes/users.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all users
router.get('/', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// POST - Create a new user
router.post('/', (req, res) => {
    const { email, name, password } = req.body;

    if (!email || !name || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const sql = 'INSERT INTO users (email, name, password) VALUES (?, ?, ?)';
    const values = [email, name, password];

    db.query(sql, values, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        res.status(201).json({ message: 'User created successfully', userId: result.insertId });
    });
});

module.exports = router;

// POST - User Sign In
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
    db.query(sql, [email, password], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const user = results[0];
        res.json({
            message: 'Login successful',
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    });
});


// POST - Logout (dummy implementation)
router.post('/logout', (req, res) => {
    // Since there's no session or token system yet, we just send success.
    res.json({ message: 'User logged out successfully' });
});
const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../utils/prisma.js')

router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10)
    
    const createdUser = await prisma.user.create({
        data: {
            username: username,
            password: hashedPassword
        }
    });

    res.json({ data: createdUser });
});

module.exports = router;

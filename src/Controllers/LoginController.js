const express = require('express');
const router = express.Router();
require("dotenv").config();
const jwt = require('jsonwebtoken');
const authService = require('../Services/AuthServices');


router.post('/login', async (req, res) => {
    try {
        const userData = await authService.login(req);
        return res.status(200).json({
            message: "Login succès !",
            user: userData,
            token: userData.token
        });

    } catch (error) {
        console.log(error.message)
        return res.status(401).json({ error: error.message });
    }
});

router.post('/register', async (req, res) => {
    try {
        const userData = await authService.register(req);

        return res.status(201).json({
            message: "Inscription succès !",
            user: userData,
            token: userData.token
        });
    } catch (error) {
        return res.status(401).json({ error: error.message });
    }
    
});

module.exports = router;

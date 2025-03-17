const express = require('express');
const router = express.Router();
const User = require("../Models/User");
const bcrypt = require('bcrypt');

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const currentUser = await User.findOne({ email });

        if (!currentUser) {
            return res.status(401).json({ error: "Vérifiez vos identifiants !" });
        }

        // Vérifier le mot de passe avec bcrypt
        const isPasswordValid = await bcrypt.compare(password, currentUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Vérifiez vos identifiants !" });
        }
        console.log("METY LE LOGIN")

        res.status(200).json({
            name: currentUser.name,
            firstname: currentUser.firstname,
            username: currentUser.username,
            email: currentUser.email,
            birthdate: currentUser.birthdate,
            roles: currentUser.role
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Une erreur s'est produite !" });
    }
});

router.post('/register', async (req, res) => {
    const { name, firstname, username, email, password, birthdate, role } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Cet email est déjà utilisé !" });
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = new User({
            name,
            firstname,
            username,
            email,
            password: hashedPassword,
            birthdate,
            role
        });
        await newUser.save();

        res.status(201).json({
            message: "Utilisateur enregistré avec succès !", user: {
                name: newUser.name,
                firstname: newUser.firstname,
                username: newUser.username,
                email: newUser.email,
                birthdate: newUser.birthdate,
                roles: newUser.role
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Une erreur s'est produite lors de l'inscription !" });
    }
});

router.get('/test', async (req, res) => {
    res.status(200).json({
        message : "Mety ehhh"
    })
});


module.exports = router;

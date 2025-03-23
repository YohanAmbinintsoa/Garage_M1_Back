const User = require("../models/User");
const bcrypt = require('bcrypt');
require("dotenv").config();
const jwt = require('jsonwebtoken');

class AuthService {
    async login(req) {
        const { email, password, role } = req.body;

        try {
            const currentUser = await User.findOne({ email });

            if (!currentUser) {
                throw new Error("Vérifiez vos identifiants !");
            }

            if (role!==currentUser.state) {
                throw new Error("Vérifiez vos identifiants !");
            }

            const isPasswordValid = await bcrypt.compare(password, currentUser.password);

            if (!isPasswordValid) {
                throw new Error("Vérifiez vos identifiants MDP !");
            }

            const token = jwt.sign(
                {
                    id: currentUser._id,
                    name: currentUser.name,
                    firstname: currentUser.firstname,
                    username: currentUser.username,
                    email: currentUser.email,
                    role: currentUser.role, // Use 'role' instead of 'state'
                },
                process.env.JWT_SECRET, // Ensure secret is in .env
                { expiresIn: "24h" }
            );

            return {
                name: currentUser.name,
                firstname: currentUser.firstname,
                username: currentUser.username,
                email: currentUser.email,
                birthdate: currentUser.birthdate,
                address: currentUser.address,
                phone: currentUser.phone,
                token: token
            };
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async register(req) {
        const { name, firstname, username, email, password, birthdate, address, phone } = req.body;
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
                address,
                phone,
                state: 0
            });
            await newUser.save();

            const token = jwt.sign(
                {
                    id: newUser._id,
                    name: newUser.name,
                    firstname: newUser.firstname,
                    username: newUser.username,
                    email: newUser.email,
                    role: newUser.state,
                },
                process.env.JWT_SECRET,
                { expiresIn: "24h" }
            );

            return {
                name: newUser.name,
                firstname: newUser.firstname,
                username: newUser.username,
                email: newUser.email,
                birthdate: newUser.birthdate,
                address: newUser.address,
                phone: newUser.phone,
                role: newUser.state,
                token: token
            };
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = new AuthService();

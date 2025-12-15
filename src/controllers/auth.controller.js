const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/user.repository");
const SimpleCodeStrategy = require("../strategies/verification/simple-code.strategy");

const verificationStrategy = new SimpleCodeStrategy("1234");


const JWT_SECRET = "SUPER_SECRET_KEY_123"; // غيّره لو حاب

//register-jira
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res
                .status(400)
                .json({ message: "name, email, password are required" });
        }

        const user = await userRepository.createUser({
            name,
            email,
            password,
            role: "customer",
        });

        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                isVerified: user.isVerified,
            },
        });
    } catch (error) {
        if (error.message === "EMAIL_EXISTS") {
            return res.status(409).json({ message: "Email already exists" });
        }
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "email and password are required" });
        }

        const user = await userRepository.findByEmail(email);
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role,
            },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.json({
            message: "Login successful",
            token,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


exports.verify = async (req, res) => {
    try {
        const { email, code } = req.body;

        if (!email || !code) {
            return res
                .status(400)
                .json({ message: "email and code are required" });
        }

        const isValid = verificationStrategy.verify(code);
        if (!isValid) {
            return res.status(400).json({ message: "Invalid verification code" });
        }

        const user = await userRepository.verifyUser(email);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.json({
            message: "User verified successfully",
            user: {
                id: user.id,
                email: user.email,
                isVerified: user.isVerified,
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
//auth done
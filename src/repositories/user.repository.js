const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

class UserRepository {
    async createUser({ name, email, password, role }) {
        const existing = await User.findOne({ email });
        if (existing) {
            throw new Error("EMAIL_EXISTS");
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            passwordHash,
            role: role || "customer",
            isVerified: false,
        });

        return user;
    }

    async findByEmail(email) {
        return await User.findOne({ email });
    }

    async verifyUser(email) {
        const user = await User.findOne({ email });
        if (!user) return null;

        user.isVerified = true;
        await user.save();
        return user;
    }

    async getAllUsers() {
        return await User.find({});
    }
}

module.exports = new UserRepository();

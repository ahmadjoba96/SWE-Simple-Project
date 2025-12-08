const bcrypt = require("bcryptjs");

let users = [];
let currentId = 1;

class UserRepository {
    async createUser({ name, email, password, role }) {
        const existing = users.find((u) => u.email === email);
        if (existing) {
            throw new Error("EMAIL_EXISTS");
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const user = {
            id: currentId++,
            name,
            email,
            passwordHash,
            role: role || "customer",
            isVerified: false,
        };

        users.push(user);
        return user;
    }

    async findByEmail(email) {
        return users.find((u) => u.email === email) || null;
    }

    async verifyUser(email) {
        const user = users.find((u) => u.email === email);
        if (!user) return null;
        user.isVerified = true;
        return user;
    }

    getAllUsers() {
        return users;
    }
}

module.exports = new UserRepository();

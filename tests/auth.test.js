const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const User = require("../src/models/user.model");

describe("Auth Integration Tests", () => {

    beforeEach(async () => {
        await User.deleteMany({});
    });

    test("Register - should return 201", async () => {
        const res = await request(app)
            .post("/api/auth/register")
            .send({
                name: "Test User",
                email: "test@example.com",
                password: "123456"
            });

        expect(res.statusCode).toBe(201);
        expect(res.body.user.email).toBe("test@example.com");
    });

    test("Register - should return 409 if email exists", async () => {
        await User.create({
            name: "Existing User",
            email: "existing@example.com",
            passwordHash: "123",
        });

        const res = await request(app)
            .post("/api/auth/register")
            .send({
                name: "New User",
                email: "existing@example.com",
                password: "123456"
            });

        expect(res.statusCode).toBe(409);
    });

    test("Login - should return 200", async () => {
        await request(app)
            .post("/api/auth/register")
            .send({
                name: "Test User",
                email: "login@test.com",
                password: "123456"
            });

        const res = await request(app)
            .post("/api/auth/login")
            .send({
                email: "login@test.com",
                password: "123456"
            });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("token");
    });

    test("Login - should return 401 for invalid password", async () => {
        await request(app)
            .post("/api/auth/register")
            .send({
                name: "User",
                email: "wrong@test.com",
                password: "123456"
            });

        const res = await request(app)
            .post("/api/auth/login")
            .send({
                email: "wrong@test.com",
                password: "999999"
            });

        expect(res.statusCode).toBe(401);
    });

    test("Verify - should return 200 for valid code", async () => {
        await request(app)
            .post("/api/auth/register")
            .send({
                name: "Verify User",
                email: "verify@test.com",
                password: "123456"
            });

        const res = await request(app)
            .post("/api/auth/verify")
            .send({
                email: "verify@test.com",
                code: "1234"
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.user.isVerified).toBe(true);
    });

    test("Verify - should return 400 for wrong code", async () => {
        const res = await request(app)
            .post("/api/auth/verify")
            .send({
                email: "verify@test.com",
                code: "5555"
            });

        expect(res.statusCode).toBe(400);
    });
});

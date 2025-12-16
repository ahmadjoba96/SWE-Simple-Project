const request = require("supertest");
const app = require("../app");

describe("Auth APIs", () => {
    test("User Registration - should return 201", async () => {
        const res = await request(app)
            .post("/api/auth/register")
            .send({
                name: "Test User",
                email: "testuser@example.com",
                password: "123456"
            });

        expect(res.statusCode).toBe(201);
    });
});

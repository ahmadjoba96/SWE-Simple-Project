const request = require("supertest");
const app = require("../app");
const Category = require("../src/models/category.model");

describe("Category Tests", () => {

    beforeEach(async () => {
        await Category.deleteMany({});
    });

    test("Create category", async () => {
        const res = await request(app)
            .post("/api/categories")
            .send({ name: "PC" });

        expect(res.statusCode).toBe(201);
    });

    test("Should not create duplicate category", async () => {
        await Category.create({ name: "PC" });

        const res = await request(app)
            .post("/api/categories")
            .send({ name: "PC" });

        expect(res.statusCode).toBe(409);
    });

    test("Get all categories", async () => {
        await Category.create({ name: "Phones" });

        const res = await request(app).get("/api/categories");

        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(1);
    });

});

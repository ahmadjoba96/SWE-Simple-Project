const request = require("supertest");
const app = require("../app");
const Product = require("../src/models/product.model");
const Category = require("../src/models/category.model");

describe("Product Tests", () => {

    beforeEach(async () => {
        await Product.deleteMany({});
        await Category.deleteMany({});
    });

    test("Create product linked to category", async () => {
        const category = await Category.create({ name: "Laptops" });

        const res = await request(app)
            .post("/api/products")
            .send({
                name: "HP Pavilion",
                price: 500,
                categoryId: category._id
            });

        expect(res.statusCode).toBe(201);
    });

    test("Reject product without valid category", async () => {
        const res = await request(app)
            .post("/api/products")
            .send({
                name: "Dell",
                price: 400,
                categoryId: "123"
            });

        expect(res.statusCode).toBe(404);
    });

});

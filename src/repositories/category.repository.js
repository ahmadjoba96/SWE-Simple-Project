const Category = require("../models/category.model");

class CategoryRepository {
    async create(name) {
        const existing = await Category.findOne({ name });
        if (existing) throw new Error("CATEGORY_EXISTS");

        return await Category.create({ name });
    }

    async getAll() {
        return await Category.find({});
    }

    async getById(id) {
        return await Category.findById(id);
    }

    async update(id, name) {
        const category = await Category.findById(id);
        if (!category) return null;

        category.name = name;
        await category.save();
        return category;
    }

    async delete(id) {
        return await Category.findByIdAndDelete(id);
    }
}

module.exports = new CategoryRepository();

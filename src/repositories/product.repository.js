const Product = require("../models/product.model");

class ProductRepository {
  async create(productData) {
    return await Product.create(productData);
  }

  async getAll() {
    return await Product.find({}).populate("categoryId", "name");
  }

  async getById(id) {
    return await Product.findById(id).populate("categoryId", "name");
  }

  async update(id, data) {
    return await Product.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return await Product.findByIdAndDelete(id);
  }
}

module.exports = new ProductRepository();

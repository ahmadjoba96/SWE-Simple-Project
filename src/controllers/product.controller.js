const productRepo = require("../repositories/product.repository");
const categoryRepo = require("../repositories/category.repository");

exports.create = async (req, res) => {
  try {
    const { name, price, categoryId } = req.body;

    const category = await categoryRepo.getById(categoryId);
    if (!category) {
      return res.status(400).json({ message: "Category does not exist" });
    }

    const product = await productRepo.create({
      name,
      price,
      categoryId
    });

    res.status(201).json({ message: "Product created", product });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAll = async (req, res) => {
  const products = await productRepo.getAll();
  res.json(products);
};

exports.getById = async (req, res) => {
  const product = await productRepo.getById(req.params.id);
  if (!product) return res.status(404).json({ message: "Not found" });
  res.json(product);
};

exports.update = async (req, res) => {
  const updated = await productRepo.update(req.params.id, req.body);
  if (!updated) return res.status(404).json({ message: "Not found" });
  res.json({ message: "Updated", updated });
};

exports.delete = async (req, res) => {
  const deleted = await productRepo.delete(req.params.id);
  if (!deleted) return res.status(404).json({ message: "Not found" });
  res.json({ message: "Deleted", deleted });
};

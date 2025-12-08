const categoryRepo = require("../repositories/category.repository");

exports.create = async (req, res) => {
    try {
        const { name } = req.body;
        const category = await categoryRepo.create(name);
        res.status(201).json({ message: "Category created", category });
    } catch (err) {
        if (err.message === "CATEGORY_EXISTS") {
            return res.status(409).json({ message: "Category already exists" });
        }
        res.status(500).json({ message: "Server error" });
    }
};

exports.getAll = async (req, res) => {
    const categories = await categoryRepo.getAll();
    res.json(categories);
};

exports.update = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const category = await categoryRepo.update(id, name);

    if (!category) return res.status(404).json({ message: "Not found" });

    res.json({ message: "Updated", category });
};

exports.delete = async (req, res) => {
    const { id } = req.params;
    const deleted = await categoryRepo.delete(id);

    if (!deleted) return res.status(404).json({ message: "Not found" });

    res.json({ message: "Deleted", deleted });
};

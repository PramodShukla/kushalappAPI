const Category = require("../models/CategorySchema");

// Create
exports.createCategory = async (req, res) => {
  const category = await Category.create(req.body);
  res.status(201).json(category);
};

// Get all
exports.getCategories = async (req, res) => {
  try {
    const data = await Category.find()
      .populate("subCategoryCount")
      .populate("providerCount")
      .sort({ createdAt: -1 });

    res.json({ response: "successful", message: "", data: data });
  } catch (error) {
    res.status(500).json({ respnse: "", message: error.message, data: [] });
  }
};

// Update
exports.updateCategory = async (req, res) => {
  const updated = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
};

// Delete
exports.deleteCategory = async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({ message: "Category deleted" });
};

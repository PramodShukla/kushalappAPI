const SubCategory = require("../models/SubCategorySchema");
const fs = require("fs");
const path = require("path");

// Create
exports.createSubCategory = async (req, res) => {
  try {
    const data = {
      ...req.body,
      ...req.savedFiles, // icon, banner, etc
    };

    const result = await SubCategory.create(data);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all
exports.getSubCategories = async (req, res) => {
  try {
    const data = await SubCategory.find()
      .populate("category", "name")
      .populate("providerCount")
      .sort({ createdAt: -1 });

    res.status(200).json({ response: "successful", message: "", data: data });
  } catch (error) {
    res
      .status(500)
      .json({ response: "fail", message: error.message, data: [] });
  }
};

// Get by category
exports.getByCategory = async (req, res) => {
  const data = await SubCategory.find({ category: req.params.categoryId });
  res.json(data);
};

// Update
exports.updateSubCategory = async (req, res) => {
  const updated = await SubCategory.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
};

// Delete
exports.deleteSubCategory = async (req, res) => {
  await SubCategory.findByIdAndDelete(req.params.id);
  res.json({ message: "SubCategory deleted" });
};

const Category = require("../models/CategorySchema");
const fs = require("fs");
const path = require("path");

// Create
exports.createCategory = async (req, res) => {
  try {
    const data = {
      ...req.body,
      ...req.savedFiles, // icon, banner, etc
    };

    const result = await Category.create(data);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all
exports.getCategories = async (req, res) => {
  try {
    const data = await Category.find()
      .select(
        "name intro icon banner description subCategoryCount providerCount",
      )
      .populate("subCategoryCount")
      .populate("providerCount")
      .sort({ sequence: 1 });

    res.json({
      response: "successful",
      message: "categories fetched successgully",
      data: data,
    });
  } catch (error) {
    res
      .status(500)
      .json({ respnse: "error", message: error.message, data: [] });
  }
};

// Update
exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: "Not found" });

    // delete old files if new ones uploaded
    if (req.savedFiles?.icon && category.icon) {
      const oldIcon = path.join(__dirname, "..", category.icon);
      if (fs.existsSync(oldIcon)) fs.unlinkSync(oldIcon);
    }

    if (req.savedFiles?.banner && category.banner) {
      const oldBanner = path.join(__dirname, "..", category.banner);
      if (fs.existsSync(oldBanner)) fs.unlinkSync(oldBanner);
    }

    const updated = await Category.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        ...req.savedFiles, // overwrite only provided files
      },
      { new: true },
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    // delete files from disk
    if (category?.icon) {
      const iconPath = path.join(__dirname, "..", category.icon);
      if (fs.existsSync(iconPath)) fs.unlinkSync(iconPath);
    }

    if (category?.banner) {
      const bannerPath = path.join(__dirname, "..", category.banner);
      if (fs.existsSync(bannerPath)) fs.unlinkSync(bannerPath);
    }

    await Category.findByIdAndDelete(req.params.id);

    res.json({ message: "Category deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

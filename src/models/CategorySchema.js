const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    intro: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },

    icon: {
      type: String,
      default: "",
    },
    banner: {
      type: String,
      default: "",
    },
    sequence: {
      type: Number,
      default: 0,
      index: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// 🔢 Virtual: Count of subcategories
categorySchema.virtual("subCategoryCount", {
  ref: "SubCategory",
  localField: "_id",
  foreignField: "category",
  count: true,
});

// 🔢 Virtual: Count of providers offering this category
categorySchema.virtual("providerCount", {
  ref: "Provider",
  localField: "_id",
  foreignField: "services.category",
  count: true,
});

module.exports = mongoose.model("Category", categorySchema);

const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
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
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }, // ✅ REQUIRED
    toObject: { virtuals: true }, // ✅ REQUIRED
  },
);

// 🔢 Virtual: Count of providers offering this subcategory
subCategorySchema.virtual("providerCount", {
  ref: "Provider",
  localField: "_id",
  foreignField: "services.subCategories",
  count: true,
});
module.exports = mongoose.model("SubCategory", subCategorySchema);

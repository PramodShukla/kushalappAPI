const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "",
    },
    intro: {
      type: String,
      default: "",
    },
    offerBanner: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    offerType: {
      type: String,
      default: "ShowData", // ShowData or OnlyBanner
    },
    
    offerDisplayType: {
      type: String,
      default: "Horizontal", // Horizontal or Vertical
    },

    offerType: {
      type: String,
      enum: ["CATEGORY", "SUBCATEGORY", "PROVIDER"],
      required: true,
    },

    categoryIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    subCategoryIds: [
      { type: mongoose.Schema.Types.ObjectId, ref: "SubCategory" },
    ],
    providerIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Provider" }],

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Offers", offerSchema);

const mongoose = require("mongoose");

const SliderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,

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

    Image: {
      type: String,
      default: "",
      required: true,
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

module.exports = mongoose.model("Sliders", SliderSchema);

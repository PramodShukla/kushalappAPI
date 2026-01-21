const mongoose = require("mongoose");

const providerSchema = new mongoose.Schema(
  {
    // -----------------------
    // Basic Profile
    // -----------------------
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
    },

    // -----------------------
    // Address
    // -----------------------
    address: {
      fullAddress: { type: String, required: true },
      area: String,
      city: { type: String, required: true },
      state: String,
      pincode: String,
    },

    // -----------------------
    // Geo location (for nearby search)
    // -----------------------
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },

    // -----------------------
    // Documents (KYC)
    // -----------------------
    documents: {
      aadhaar: {
        type: String,
        required: true,
        unique: true,
      },
      pan: {
        type: String,
        required: true,
        unique: true,
      },
    },

    // -----------------------
    // Verification Status
    // -----------------------
    verification: {
      mobileVerified: { type: Boolean, default: false },
      emailVerified: { type: Boolean, default: false },
      aadhaarVerified: { type: Boolean, default: false },
      panVerified: { type: Boolean, default: false },

      // Final approval by admin/system
      userVerified: { type: Boolean, default: false },
    },

    // -----------------------
    // Services (Category & SubCategory refs)
    // -----------------------
    services: [
      {
        category: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Category",
          required: true,
        },
        subCategories: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SubCategory",
          },
        ],
      },
    ],

    // -----------------------
    // Experience & Rating
    // -----------------------
    experience: {
      type: Number,
      default: 0,
    },

    rating: {
      type: Number,
      default: 0,
    },

    // -----------------------
    // Status flags
    // -----------------------
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// -----------------------
// Indexes
// -----------------------

// For nearby search
providerSchema.index({ location: "2dsphere" });

// Ensure uniqueness (important in production)
providerSchema.index({ email: 1 }, { unique: true });
providerSchema.index({ phone: 1 }, { unique: true });
providerSchema.index({ "documents.aadhaar": 1 }, { unique: true });
providerSchema.index({ "documents.pan": 1 }, { unique: true });

module.exports = mongoose.model("Provider", providerSchema);

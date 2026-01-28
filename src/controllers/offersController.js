const Offer = require("../models/offerSchema");

// CREATE OFFER
exports.createOffer = async (req, res) => {
  try {
    const offer = await Offer.create(req.body);

    res.status(201).json({
      success: true,
      message: "Offer created successfully",
      data: offer,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL OFFERS (with dynamic list based on offerType)
exports.getAllOffers = async (req, res) => {
  try {
    const offers = await Offer.find({ isActive: true })
      .populate("categoryIds", "name icon")
      .populate("subCategoryIds", "name categoryId")
      .populate("providerIds", "name service rating")
      .sort({ createdAt: -1 })
      .lean();

    const formatted = offers.map((offer) => {
      let list = [];

      if (offer.offerType === "CATEGORY") list = offer.categoryIds;
      if (offer.offerType === "SUBCATEGORY") list = offer.subCategoryIds;
      if (offer.offerType === "PROVIDER") list = offer.providerIds;

      return {
        _id: offer._id,
        title: offer.title,
        intro: offer.intro,
        offerBanner: offer.offerBanner,
        description: offer.description,
        offerDisplayType: offer.offerDisplayType,
        offerType: offer.offerType,
        isActive: offer.isActive,
        list,
        createdAt: offer.createdAt,
      };
    });

    res.json({
      success: true,
      count: formatted.length,
      data: formatted,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch offers",
      error: error.message,
    });
  }
};

// GET OFFER BY ID
exports.getOfferById = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id)
      .populate("categoryIds")
      .populate("subCategoryIds")
      .populate("providerIds");

    if (!offer) {
      return res.status(404).json({
        success: false,
        message: "Offer not found",
      });
    }

    res.json({
      success: true,
      data: offer,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid ID",
    });
  }
};

// UPDATE OFFER
exports.updateOffer = async (req, res) => {
  try {
    const updated = await Offer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Offer not found",
      });
    }

    res.json({
      success: true,
      message: "Offer updated successfully",
      data: updated,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE OFFER
exports.deleteOffer = async (req, res) => {
  try {
    const deleted = await Offer.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Offer not found",
      });
    }

    res.json({
      success: true,
      message: "Offer deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid ID",
    });
  }
};

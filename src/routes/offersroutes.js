const express = require("express");
const router = express.Router();
const offerController = require("../controllers/offersController");
const { upload, processUploads } = require("../middlewares/upload");

// Create offer
router.post("/", offerController.createOffer);

// Get all offers
router.get("/", offerController.getAllOffers);

// Get single offer
router.get("/:id", offerController.getOfferById);

// Update offer
router.put("/:id", offerController.updateOffer);

// Delete offer
router.delete("/:id", offerController.deleteOffer);

module.exports = router;

const express = require("express");
const router = express.Router();
const { upload, processUploads } = require("../middlewares/upload");
const controller = require("../controllers/providerController");
const parseFormDataJson = require("../middlewares/parseFormDataJson");

router.get("/", controller.providerslist);
router.post(
  "/create",
  upload.fields([{ name: "profilePic", maxCount: 1 }]), // multer first
  parseFormDataJson, // then parse JSON
  processUploads("provider"),
  controller.createProfile,
);
router.put("/:id/profile", controller.updateProfile);
router.put("/:id/location", controller.updateLocation);
router.put("/:id/services", controller.updateServices);
router.put("/:id/kyc", controller.submitKYC);

module.exports = router;

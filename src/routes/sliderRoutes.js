const express = require("express");
const router = express.Router();
const { upload, processUploads } = require("../middlewares/upload");
const controller = require("../controllers/sliderController");

// Admin only
router.post(
  "/",
  upload.fields([
    { name: "icon", maxCount: 1 },
    { name: "banner", maxCount: 1 },
  ]),
  processUploads("slider"),
  controller.createSlider,
);
router.get("/", controller.getSliders);
router.put(
  "/:id",
  upload.fields([
    { name: "icon", maxCount: 1 },
    { name: "banner", maxCount: 1 },
  ]),
  processUploads("slider"),
  controller.updateSlider,
);
router.delete("/:id", controller.deleteSlider);

module.exports = router;

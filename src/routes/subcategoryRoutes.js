const express = require("express");
const router = express.Router();
const { upload, processUploads } = require("../middlewares/upload");
const controller = require("../controllers/subcategoryController");

router.post(
  "/",
  upload.fields([
    { name: "icon", maxCount: 1 },
    { name: "banner", maxCount: 1 },
  ]),
  processUploads("subcategory"),
  controller.createSubCategory,
);
router.get("/", controller.getSubCategories);
router.get("/category/:categoryId", controller.getByCategory);

router.put(
  "/:id",
  upload.fields([
    { name: "icon", maxCount: 1 },
    { name: "banner", maxCount: 1 },
  ]),
  processUploads("subcategory"),
  controller.updateSubCategory,
);
router.delete("/:id", controller.deleteSubCategory);

module.exports = router;

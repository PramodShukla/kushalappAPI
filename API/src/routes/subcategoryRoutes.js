const express = require("express");
const router = express.Router();

const controller = require("../controllers/subcategoryController");

router.post("/", controller.createSubCategory);
router.get("/", controller.getSubCategories);
router.get("/category/:categoryId", controller.getByCategory);

router.put("/:id", controller.updateSubCategory);
router.delete("/:id", controller.deleteSubCategory);

module.exports = router;

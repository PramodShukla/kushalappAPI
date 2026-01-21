const express = require("express");
const router = express.Router();

const controller = require("../controllers/providerController");

router.get("/", controller.providerslist);
router.post("/create", controller.createProfile);
router.put("/:id/profile", controller.updateProfile);
router.put("/:id/location", controller.updateLocation);
router.put("/:id/services", controller.updateServices);
router.put("/:id/kyc", controller.submitKYC);

module.exports = router;

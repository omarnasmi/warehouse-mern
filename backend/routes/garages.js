const express = require("express");
const router = express.Router();
const Garage = require("../models/garageModel");
const { createGarage,
    getAllGarages,
    getGarageById,
    deleteGarage,
    updateGarage } = require("../controllers/garageController");

router.post("/", createGarage);
router.get("/", getAllGarages);
router.get("/:id", getGarageById);
router.delete("/:id", deleteGarage);
router.put("/:id", updateGarage);

module.exports = router;
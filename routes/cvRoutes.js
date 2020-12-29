const express = require("express");
const {
  createCV,
  downloadCV,
  deleteCV,
  saveCV,
  getUserCvs,
} = require("../controllers/cvController");
const { protect } = require("../controllers/authController");

const router = express.Router();

router.post("/", createCV);

router.get("/:id", downloadCV);

router.post("/delete/:id", protect, deleteCV);

router.post("/save", saveCV);

router.get("/all/:id", protect, getUserCvs);

module.exports = router;

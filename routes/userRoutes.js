const express = require("express");
const { changePassword } = require("../controllers/userController");
const { protect } = require("../controllers/authController");

const router = express.Router();

router.post("/changePassword", protect, changePassword);

module.exports = router;

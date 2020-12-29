const express = require("express");
const {
  signUp,
  login,
  protect,
  logout,
} = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signUp);

router.post("/login", login);

router.get("/logout", protect, logout);

router.get("/protected", protect, (req, res) => {
  res.status(200).json({
    status: "success",
    user: req.user,
  });
});

module.exports = router;

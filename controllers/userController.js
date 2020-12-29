const bcrypt = require("bcryptjs");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const User = require("../models/userModel");

exports.changePassword = catchAsync(async (req, res, next) => {
  if (
    !req.body.oldPassword ||
    !req.body.newPassword ||
    !req.body.newConfirmPassword ||
    !req.body.email
  ) {
    return next(new AppError("Please fill all the fields"));
  }

  if (req.body.newPassword !== req.body.newConfirmPassword) {
    return next(new AppError("Passwords must match"));
  }

  const user = await User.findOne({ email: req.body.email }).select(
    "+password"
  );

  if (!user) {
    return next(new AppError("Wrong email!"));
  }

  const passwordsMatch = await bcrypt.compare(
    req.body.oldPassword,
    user.password
  );

  if (!passwordsMatch) {
    return next(new AppError("Old password is wrong."));
  }

  const newPasswordHash = await bcrypt.hash(req.body.newPassword, 15);
  user.password = newPasswordHash;
  await user.save();

  res.status(200).json({
    status: "success",
  });
});

const moongose = require("mongoose");

const refreshTokenSchema = moongose.Schema({
  token: {
    type: String,
    required: [true, "Refresh token is required."],
  },
  userId: {
    type: moongose.SchemaTypes.ObjectId,
    required: [true, "Refresh token must have a user id."],
  },
  issuedAt: {
    type: Date,
    required: [true, "Refresh token must have an issue date."],
  },
  expiresAt: {
    type: Date,
    required: [true, "Refresh token must have an expiration date."],
  },
});

const RefreshToken = moongose.model("RefreshToken", refreshTokenSchema);

module.exports = RefreshToken;

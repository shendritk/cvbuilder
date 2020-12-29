const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");
const Cv = require("../models/cvModel");
const RefreshToken = require("../models/refreshTokenModel");
const AppError = require("../utils/AppError");

const generateTokensFromRefreshToken = async (req, res, next) => {
  const refreshToken = await RefreshToken.findOne({
    token: req.cookies.jwt_refresh,
  });

  // Check if token exists
  if (!refreshToken) {
    return next(new AppError("Invalid token."));
  }

  // Check if refresh token hasn't expired
  if (refreshToken.expiresAt <= new Date(Date.now())) {
    return next(new AppError("Token has expired."));
  }

  // Verify the refresh token
  const decoded = await promisify(jwt.verify)(
    refreshToken.token,
    process.env.JWT_REFRESH_TOKEN
  );

  // Find the user from the id on the token payload and check if it exists.
  const user = await User.findById(decoded.id);
  if (!user) {
    return next(new AppError("Invalid token."));
  }

  // Generate the new tokens and attach the cookies to response.
  await RefreshToken.deleteOne({ token: req.cookies.jwt_refresh });
  const tokens = await generateTokens(decoded.id);
  await createCookies(tokens, req, res);

  // Everything is fine, so move to the next middleware.
  req.user = user;
  next();
};

const generateTokens = async (id) => {
  // Generate the access token
  const jwt_access_token = await promisify(jwt.sign)(
    { id },
    process.env.JWT_ACCESS_TOKEN,
    {
      expiresIn: `${process.env.JWT_ACCESS_EXPIRES_IN}m`,
    }
  );

  // Generate the refresh token
  const jwt_refresh_token = await promisify(jwt.sign)(
    { id },
    process.env.JWT_REFRESH_TOKEN,
    {
      expiresIn: `${process.env.JWT_REFRESH_EXPIRES_IN}d`,
    }
  );

  // Add the refresh token to database for later validation.
  await RefreshToken.create({
    token: jwt_refresh_token,
    userId: id,
    issuedAt: new Date(Date.now()),
    expiresAt: new Date(
      Date.now() +
        parseInt(process.env.JWT_REFRESH_EXPIRES_IN) * 24 * 60 * 60 * 1000
    ),
  });

  return { jwt_access_token, jwt_refresh_token };
};

const createCookies = (tokens, req, res) => {
  const { jwt_access_token, jwt_refresh_token } = tokens;

  // Create cookie options
  const accessTokenCookieOptions = {
    expires: new Date(
      Date.now() + parseInt(process.env.JWT_ACCESS_EXPIRES_IN) * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  };

  const refreshTokenCookieOptions = {
    expires: new Date(
      Date.now() +
        parseInt(process.env.JWT_REFRESH_EXPIRES_IN) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  };

  // Create the cookies and attach them to response.
  res.cookie("jwt_access", jwt_access_token, accessTokenCookieOptions);
  res.cookie("jwt_refresh", jwt_refresh_token, refreshTokenCookieOptions);

  return res;
};

const sendTokens = async (user, req, res, cookies) => {
  // Generate tokens
  const tokens = await generateTokens(user._id, cookies);

  const resWithCookies = createCookies(tokens, req, res);
  res = resWithCookies;

  // Remove the user password from response.
  user.password = undefined;

  // Send back the user and tokens
  res.status(200).json({
    status: "success",
    jwt_access_token: tokens.jwt_access_token,
    jwt_refresh_token: tokens.jwt_refresh_token,
    data: {
      user,
    },
  });
};

exports.signUp = async (req, res, next) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  // Check if the properties exist
  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    return next(new AppError("Please fill all the required fields."));
  }

  if (password !== confirmPassword) {
    return next(new AppError("Passwords do not match."));
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 15);

  // Avoid using just 'req.body' since it can contain properties we don't want.
  const userInfo = User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  // Check if the email already exits
  const duplicateUser = await User.findOne({ email });
  if (duplicateUser) {
    return next(new AppError("A user with that email already exits."));
  }

  const user = await User.create(userInfo);

  if (!user) {
    return next(new AppError("Error creating the user."));
  }

  // Create tokens, cookies and respond
  sendTokens(user, req, res, req.cookies);
};

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("Please enter username and password."));
  }

  // Verify the user exists.
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    // The user doesn't exist - Send back an error
    return next(new AppError("Wrong email or password. Please try again."));
  }

  // Check if the password is correct
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return next(new AppError("Wrong email or password. Please try again."));
  }

  // Check if the user is logging in because he clickled 'Save CV'
  if (req.query.save === "true") {
    // Get cv from body
    if (!req.body.cv) {
      return next(new AppError("Please provide a cv object."));
    }
    const { cv } = req.body;
    const firstName = cv.contacts[0].value;
    const lastName = cv.contacts[1].value;
    const profession = cv.contacts[2].value;
    const address = cv.contacts[3].value;
    const city = cv.contacts[4].value;
    const country = cv.contacts[5].value;
    const zipCode = cv.contacts[6].value;
    const phoneNumber = cv.contacts[7].value;
    const website = cv.contacts[8].value;

    const createdCv = await Cv.create({
      template: cv.template,
      firstName,
      lastName,
      profession,
      address,
      city,
      country,
      zipCode,
      phoneNumber,
      website,
      skills: cv.skills,
      languages: cv.languages,
      hoobies: cv.hoobies,
      experiences: cv.experiences,
      education: cv.education,
      references: cv.references,
    });

    // Update the cv list of the user
    if (createdCv) {
      await User.updateOne({ email }, { cvs: [...user.cvs, createdCv._id] });
    }
  }

  // Create tokens, cookies and respond
  sendTokens(user, req, res, req.cookies);
});

exports.protect = async (req, res, next) => {
  let accessToken = req.cookies.jwt_access;
  let refreshToken = req.cookies.jwt_refresh;

  if (!accessToken && !refreshToken)
    return next(new AppError("Not authorized to proceed"));

  let decoded;
  if (accessToken) {
    try {
      // Verify the token
      decoded = await promisify(jwt.verify)(
        accessToken,
        process.env.JWT_ACCESS_TOKEN
      );
    } catch (err) {
      return next(new AppError("Invalid token!"));
    }
  } else if (refreshToken) {
    // New access token with refresh token.
    try {
      await generateTokensFromRefreshToken(req, res, next);
      return;
    } catch (err) {
      return next(new AppError("Invalid token!"));
    }
  } else {
    return next(new AppError("Invalid token!"));
  }

  const user = await User.findById(decoded.id);

  if (!user) {
    return next(new AppError("Invalid token!"));
  }

  // Everything is fine, so proceed to the next middleware/route.
  req.user = user;
  next();
};

exports.logout = (req, res) => {
  const cookieOptions = {
    expiresIn: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  };
  // Send short-lived dummy cookies back so the user isn't authenticated anymore.
  res.cookie("jwt_access", "aa", cookieOptions);
  res.cookie("jwt_refresh", "bb", cookieOptions);

  res.status(200).json({
    status: "success",
    message: "Logged out.",
  });
};

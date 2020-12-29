const catchAsync = require("../utils/catchAsync");
const Cv = require("../models/cvModel");
const generatePdf = require("../utils/generatePdf");
const AppError = require("../utils/AppError");
const User = require("../models/userModel");

exports.createCV = catchAsync(async (req, res) => {
  try {
    // Generate the pdf and get the new url
    const url = await generatePdf(req.body.values, req.body.template);

    // Respond with the new url
    res.status(200).json({
      status: "Success",
      url,
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: "Error creating pdf file.",
    });
  }
});

exports.downloadCV = catchAsync(async (req, res, next) => {
  try {
    const fileUrl = `${__dirname}/../pdf-files/${req.params.id}.pdf`;

    // Send the file back
    res.download(fileUrl);
  } catch (err) {
    return next(new AppError("Error getting the pdf file", 404));
  }
});

exports.getAllCvs = catchAsync(async (req, res) => {
  const cvs = await Cv.find();

  res.status(200).json({
    status: "success",
    results: cvs.length,
    data: {
      cvs,
    },
  });
});

exports.getUserCvs = catchAsync(async (req, res, next) => {
  if (!req.params.id) {
    return next(new AppError("Invalid user."));
  }

  const user = await User.findById(req.params.id).populate({ path: "cvs" });

  if (!user) {
    return next(new AppError("Invalid user id."));
  }

  res.status(200).json({
    status: "success",
    results: user.cvs.length,
    cvs: user.cvs,
  });
});

exports.getCv = catchAsync(async (req, res, next) => {
  const cvId = req.params.id;

  const cv = await Cv.findById(cvId);

  if (!cv) return next(new AppError("CV doesn't exist.", 400));

  res.status(200).json({
    status: "success",
    data: {
      cv,
    },
  });
});

exports.saveCV = catchAsync(async (req, res, next) => {
  const { cv, email } = req.body;

  if (!cv) {
    return next(new AppError("Please provide a valid CV."));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(new AppError("Invalid user."));
  }

  if (user.cvs.length >= 2) {
    return next(new AppError("A user can have up to two cvs only."));
  }

  let url;
  try {
    // Generate the pdf and get the new url
    url = await generatePdf({ categories: cv }, cv.template);
  } catch (err) {
    return next(new AppError("Error creating cv."));
  }

  const firstName = cv.contacts[0].value;
  const lastName = cv.contacts[1].value;
  const profession = cv.contacts[2].value;
  const address = cv.contacts[3].value;
  const city = cv.contacts[4].value;
  const country = cv.contacts[5].value;
  const zipCode = cv.contacts[6].value;
  const phoneNumber = cv.contacts[7].value;
  const website = cv.contacts[8].value;

  const downloadUrlArr = url.split("/");

  const newCv = await Cv.create({
    template: cv.template,
    downloadUrl: downloadUrlArr[downloadUrlArr.length - 1],
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

  await User.updateOne({ email }, { cvs: [...user.cvs, newCv._id] });

  res.status(200).json({
    status: "success",
  });
});

exports.deleteCV = catchAsync(async (req, res, next) => {
  const { userId } = req.body;
  const cvId = req.params.id;

  const user = await User.findById(userId);
  user.cvs.pull({ _id: cvId });

  await user.save();

  await Cv.deleteOne({ _id: cvId });

  res.status(200).json({
    status: "success",
  });
});

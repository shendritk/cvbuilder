const mongoose = require("mongoose");

const cvSchema = mongoose.Schema({
  template: {
    type: Number,
    required: [true, "CV must have a template number."],
  },
  downloadUrl: String,
  firstName: {
    type: String,
    required: [true, "CV must have a first name."],
  },
  lastName: {
    type: String,
    required: [true, "CV must have a last name."],
  },
  profession: String,
  address: String,
  city: String,
  country: String,
  zipCode: String,
  phoneNumber: String,
  email: String,
  website: String,
  skills: [
    {
      name: String,
      progress: Number,
    },
  ],
  languages: [
    {
      name: String,
      level: String,
    },
  ],
  hoobies: [
    {
      name: String,
    },
  ],
  experiences: [
    {
      startedAt: String,
      completedAt: String,
      position: String,
      company: String,
      description: String,
    },
  ],
  education: [
    {
      startedAt: String,
      completedAt: String,
      institution: String,
      studyField: String,
      description: String,
    },
  ],
  references: [
    {
      fullName: String,
      profession: String,
      phoneNumber: String,
      email: String,
    },
  ],
});

const CvModel = mongoose.model("Cv", cvSchema);

module.exports = CvModel;

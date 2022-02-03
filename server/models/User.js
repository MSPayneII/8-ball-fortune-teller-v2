import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const questionAnswerSchema = mongoose.Schema({
  pair: {
    question: {
      type: String,
    },
    answer: {
      type: String,
    },
  },
});

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    minlength: 2,
    maxlength: 30,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    minlength: 5,
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid email",
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 1,
    select: false,
  },
  homeTown: {
    type: String,
    maxlength: 30,
    trim: true,
    default: "My Hometown",
  },
  currentLocation: {
    type: String,
    maxlength: 30,
    trim: true,
    default: "The here and now",
  },
  zodiacSign: {
    type: String,
    maxlength: 20,
    default: "My zodiac sign",
  },
  questionAnswer: [],
});

// mongoose middleware  and where the passwords are hashed
// hashing the password using middleware hook before saving the document
UserSchema.pre("save", async function () {
  // console.log(this.modifiedPaths());
  if (!this.isModified("password")) {
    return;
  }
  const salt = await bcrypt.genSalt(10); //generate the salt (creating extra characters)
  this.password = await bcrypt.hash(this.password, salt); // pass in the user generated password and set up the document password equal to a hash password
});

UserSchema.methods.createJsonWebToken = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET);
};

UserSchema.methods.checkPassword = async function (inputtedPassword) {
  const doesItMatch = await bcrypt.compare(inputtedPassword, this.password); //boolean value
  return doesItMatch;
};

//compile model from schema. User is the name of the collection
export default mongoose.model("User", UserSchema);

import User from "../models/User.js";

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new Error("Please provide all values");
  }
  const userAlreadyHere = await User.findOne({ email });

  if (userAlreadyHere) {
    throw new Error("Email already in system");
  }
  const user = await User.create({ name, email, password });
  const token = user.createJsonWebToken();

  res.status(201).json({
    user: {
      name: user.name,
      email: user.email,
      homeTown: user.homeTown,
      currentLocation: user.currentLocation,
      zodiacSign: user.zodiacSign,
    },
    token,
  }); //code 201 is "created"
};
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new Error("Please complete all fields");
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new Error("No user with this email");
  }

  // console.log(user);
  const isPasswordCorrect = await user.checkPassword(password);
  if (!isPasswordCorrect) {
    throw new Error("No user with this email");
  }
  const token = user.createJsonWebToken();

  res.status(200).json({
    user: {
      name: user.name,
      email: user.email,
      _id: user._id,
      homeTown: user.homeTown,
      currentLocation: user.currentLocation,
      zodiacSign: user.zodiacSign,
    },
    token,
  });
  res.send("login user");
};
const updateUser = (req, res) => {
  res.send("update user");
};

export { register, login, updateUser };

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

  const isPasswordCorrect = await user.checkPassword(password);
  if (!isPasswordCorrect) {
    throw new Error("Email or password is not correct");
  }
  const token = user.createJsonWebToken();

  res.status(200).json({
    user: {
      name: user.name,
      homeTown: user.homeTown,
      currentLocation: user.currentLocation,
      zodiacSign: user.zodiacSign,
    },
    token,
  });
  // res.send("login user");
};
const updateUser = async (req, res) => {
  const { name, homeTown, currentLocation, zodiacSign } = req.body;

  // console.log(req.user); //confirm I have access to user
  // console.log(req.user.userId); //confirm I have access to user id

  if (!name || !homeTown || !currentLocation || !zodiacSign) {
    throw new Error("Please provide all values");
  }
  const user = await User.findOne({ _id: req.user.userId });

  user.name = name;
  user.homeTown = homeTown;
  user.currentLocation = currentLocation;
  user.zodiacSign = zodiacSign;

  await user.save();
  // // // console.log(user);

  const token = user.createJsonWebToken();

  res.status(200).json({
    user,
    token,
  });
};

const deleteUser = async (req, res) => {
  const user = await User.deleteOne({ _id: req.user.userId });
  // console.log(user.name);
  // console.log(user);
  console.log(user);
  // const token = user.createJsonWebToken();

  res.status(200).json({ msg: "User Deleted" });
};

export { register, login, updateUser, deleteUser };

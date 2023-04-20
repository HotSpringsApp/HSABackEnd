const router = require("express").Router();
const bcrypt = require("bcryptjs");                       // to encrypt passwords before storing in DB
const jwt = require("jsonwebtoken");                      // to generate a token to authorise access to certain pages
const User = require("../models/userModel");
// const auth = require("../middleware/auth");            // mainly used to delete an user (also to grab one user)

// Register route
router.post("/register", async (req, res) => {
  try {
    const { email, password, passwordCheck, firstName, lastName } = req.body;

    if (!email || !password || !passwordCheck || !firstName || !lastName) {
      return res.status(400).json({ msg: "Not all fields have been entered" });
    }

    if (password.length < 5) {
      return res
        .status(400)
        .json({ msg: "The password needs to be at least 5 characters long" });
    }

    if (password !== passwordCheck) {
      return res
        .status(400)
        .json({ msg: "Passwords do not match. Please try again" });
    }

    const existingEmail = await User.findOne({ email: email });         // findOne() is a Mongo Model built in method
    if (existingEmail) {
      return res
        .status(400)
        .json({ msg: "An account with this email already exists" });
    }

    // Hashing passwords before adding to db
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      email: email,
      password: passwordHash,
      firstName: firstName,
      lastName: lastName,
    });

    const savedUser = await newUser.save();
    res.json(savedUser);

    // console.log('Data saved in DB:')
    // console.log(savedUser);

  } catch (error) {
    res.status(500).json({ err: error.message });
  }
});

// login route setup
router.post("/login", async (req, res) => {
  try {
    // console.log('Login data passed to server')
    // console.log(req.body);

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Not all fields have been entered" });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "Invalid credentails" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Creating our json web token by passing the user id and our JWT_SECRET
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });

    // console.log('Token generated:')
    // console.log(token);

  } catch (error) {
    res.status(500).json({ err: error.message });
  }
});

// delete user account route
// router.delete("/delete", auth, async (req, res) => {
//   try {
//     const deletedUser = await User.findByIdAndDelete(req.user);         // findByIdAndDelete() is a Mongo Model built in method
//     res.json(deletedUser);
//   } catch (error) {
//     res.status(500).json({ err: error.message });
//   }
// });

// validating if user is logged in by boolean check most useful for front-end
router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);         // findById() is a Mongo Model built in method
    if (!user) return res.json(false);

    return res.json(true);
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
});

// This route is grabbing one user
// router.get("/", auth, async (req,res) => {
//   const user = await User.findById(req.user)         // findById() is a Mongo Model built in method
//   res.json({
//     firstName: user.firstName,
//     lastName: user.lastName,
//     id: user._id,
//   })
// });

module.exports = router;

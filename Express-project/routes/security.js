const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const hashPassword = require("../service/hashPassword");

const cookieParser = require("cookie-parser");
const sendEmail = require("../service/sendEmail");
const { default: mongoose } = require("mongoose");

const router = express.Router();
require("dotenv").config();

router.use(cookieParser());


router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(400).json({ message: "Email or password is wrong" });
  }

  const passwordIsValid = await bcrypt.compare(password, user.password);
  if (!passwordIsValid) {
    return res.status(400).json({ message: "Email or password is wrong" });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE_IN }
  );
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return res.status(200).json({
    message: "the user is successfully in ",
    user: user,
  });
});



router.post("/register", async (req, res) => {
  const { name, email, age, password } = req.body;

  const tmpUser = await User.findOne({ email });

  if (tmpUser) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const hashedPassword = await hashPassword(password);


  let user = new User({
    name: name,
    email: email,
    age: age,
    password: hashedPassword,
    role:'user'
  });

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: parseInt(process.env.JWT_VERIFY_EMAIL_EXPIRE_AFTER),
  });

  const expireDate = parseInt(process.env.JWT_VERIFY_EMAIL_EXPIRE_AFTER);
  if (isNaN(expireDate)) {
    return res
      .status(415)
      .json({ message: "type error in expire date from security token" });
  }

  user.verificationToken = token;
  user.verificationTokenExpireDate = Date.now() + expireDate * 1000;

  const object = "Verify Email";
  const verifyLink = `${req.protocol}://${req.get(
    "host"
  )}/verify?token=${token}`;
  const message = `
      
        Hi ${user.name},
  
        We just need to verify your email address before you can continue.
  
        Verify your email address <a href="${verifyLink}">Link</a>
  
        Thanks! The [company] team
      
      `;

  await sendEmail(email, object, message);

  await user.save();

  res.status(200).json({ message: "Verification email sent!" });
});



router.post("/verify/:id/:token", async (req, res) => {
  const { id, token } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (Date.now() > user.verificationTokenExpireDate) {
      return res.status(400).json({ message: "The link is expired" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.id !== user._id.toString() || decoded.email !== user.email) {
        return res.status(400).json({ message: "Invalid verification link" });
      }
    } catch (error) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    if (user.verificationToken !== token) {
      return res.status(400).json({ message: "Invalid verification link" });
    }

    user.verified = true;
    user.verificationToken = null;
    user.verificationTokenExpireDate = null;
    await user.save();

    return res.status(200).json({ message: "User verified successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error verifying user", error });
  }
});



module.exports = router;

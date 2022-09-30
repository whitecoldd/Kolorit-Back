const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    fname: req.body.fname,
    lname: req.body.lname,
    phone: req.body.phone,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_PASS
    ).toString(),
  });
  try {
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.post("/login", async (req, res) => {
  const { userEmailPhone } = req.body;
  try {
    // const user = await User.findOne({
    //   $or: [
    //     {
    //       email: userEmailPhone.email,
    //     },
    //     {
    //       phone: userEmailPhone.phone,
    //     },
    //     {
    //       username: userEmailPhone.username,
    //     },
    //   ],
    // });
    const user = await User.findOne({
      username: req.body.username
    });
    if (!user) {
      res.status(401).json("User does not exist in the DB");
      return;
    }

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.SECRET_PASS
    );
    const RealPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    RealPassword !== req.body.password &&
      res.status(401).json("Wrong login or password");

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.SECRET_JWT,
      { expiresIn: "30d" }
    );

    const { password, ...others } = user._doc;
    res.status(200).json({ ...others, accessToken });
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;

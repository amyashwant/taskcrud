const router = require("express").Router();
const Verify = require("../models/Verify");

const bcrypt = require("bcrypt");

router.post("/add-user", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new Verify({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    const signups = await user.save();

    res.status(200).json(signups);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.post("/login-user", async (req, res) => {
  try {
    const user = await Verify.findOne({ email: req.body.email });

    // !user && res.status(404).json("user not found");

    if (!user) {
     return res.status(404).json("user not found");
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    !validPassword && res.status(404).json("wrong password");
    res.status(200).json(user);
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;

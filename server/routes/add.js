const Plus = require("../models/Plus");
const router = require("express").Router();


router.post("/add-order", async (req, res) => {
  const newAdd = new Plus(req.body);
  try {
    const savedPost = await newAdd.save();
    res.status(200).json(savedPost);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get("/get-order", async (req, res) => {
  const add = await Plus.find();
  res.status(200).json(add);
});

router.get("/get-order/:id", async (req, res) => {
  const add = await Plus.findById(req.params.id);
  res.status(200).json(add);
});

router.put("/:id", async (req, res) => {
  try {
    const post = await Plus.findById(req.params.id);
    await post.updateOne({ $set: req.body });
    res.status(200).json(post)

  } catch (error) {
    res.status(500).json(error);
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const post = await Plus.findById(req.params.id);
    await post.deleteOne();
    res.status(200).json("post deleted successfully")
  } catch (error) {
    res.status(500).json(error);
  }
});



module.exports = router;

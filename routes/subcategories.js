const router = require("express").Router();
const SubCategories = require("../models/SubCategories");
const {
  verifyToken,
  verifyTokenAndAuthor,
  verifyTokenAndAdmin,
} = require("./verifyToken");

router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newCat = new SubCategories(req.body);

  try {
    const savedCat = await newCat.save();
    res.status(200).json(savedCat);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedCat = await SubCategories.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCat);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await SubCategories.findByIdAndDelete(req.params.id);
    res.status(200).json("Category has been deleted");
  } catch (e) {
    res.status(500).json(e);
  }
});

router.get("/find/:id", async (req, res) => {
  try {
    const cat = await SubCategories.findById(req.params.id);
    res.status(200).json(cat);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.get("/find", async (req, res) => {
  const qCat = req.query.cat;

  try {
    let Cat;
    if (qCat) {
      Cat = await SubCategories.find({
        cat: {
          $in: [qCat],
        },
      });
    } else {
      Cat = await SubCategories.find();
    }

    res.status(200).json(Cat);
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;

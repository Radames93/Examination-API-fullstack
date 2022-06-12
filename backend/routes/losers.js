const express = require("express");
const router = express.Router();

const getDatabase = require("../database.js");
const db = getDatabase();

// GET all hamsters
router.get("/", async (req, res) => {
  let defeatHamsters = [];

  try {
    const docRef = db.collection("hamsters");
    const snapShot = await docRef.orderBy("defeats", "desc").limit(1).get();

    if (snapShot.empty) {
      res.status(404).send("There are no hamsters!");
      return;
    }
    snapShot.forEach((doc) => {
      const data = doc.data();
      data.id = doc.id;
      defeatHamsters.push(data);
    });
    res.send(defeatHamsters);
  } catch (error) {
    console.log("An error occured!" + error.message);
    res.status(500).send(error.message);
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();

const getDatabase = require("../database.js");
const db = getDatabase();

// GET all hamsters
router.get("/", async (req, res) => {
  let allHamsters = [];

  try {
    const docRef = db.collection("hamsters");
    const snapShot = await docRef.orderBy("wins", "desc").limit(1).get();

    if (snapShot.empty) {
      res.status(404).send("There are no hamsters!");
      return;
    }
    snapShot.forEach((doc) => {
      const data = doc.data();
      data.id = doc.id;
      allHamsters.push(data);
    });
    res.send(allHamsters);
  } catch (error) {
    console.log("An error occured!" + error.message);
    res.status(500).send(error.message);
  }
});

module.exports = router;

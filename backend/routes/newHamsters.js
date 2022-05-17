import express from "express";
const router = express.Router();

import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../database/firebase.js";

router.get("/", async (req, res) => {
  const colRef = collection(db, "hamsters");
  let hamsters = [];

  const snapshot = await getDocs(colRef);
  snapshot.docs.forEach((docSnapshot) => {
    hamsters.push({ ...docSnapshot.data(), id: docSnapshot.id });
  });

  res.send(hamsters);
});

router.get("/random", async (req, res) => {
  const colRef = collection(db, "hamsters");
  let hamsters = [];

  const snapshot = await getDocs(colRef);
  snapshot.docs.forEach((docSnapshot) => {
    hamsters.push({ ...docSnapshot.data(), id: docSnapshot.id });
  });

  function random_hamster() {
    return hamsters[Math.floor(Math.random() * hamsters.length)];
  }

  res.send(random_hamster());
});

router.get("/:id", async (req, res) => {
  const toBeFound = req.params.id;
  const docRef = doc(db, "hamsters", toBeFound);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    res.send(docSnap.data());
    return;
  } else {
    // doc.data() will be undefined in this case
    res.sendStatus(404);
    return;
  }
});
router.post("/", async (req, res) => {
  let addNewHamster = {
    name: "Mimi",
    age: 3,
    favFood: "ägg",
    loves: "spela",
    imgName: "hamster-21.jpg",
    wins: 0,
    defeats: 0,
    games: 0,
  };

  const colRef = collection(db, "hamsters");

  const newDocRef = await addDoc(colRef, addNewHamster);

  console.log("Lade till nytt dokument med id: ", newDocRef.id);

  const Objekt = {
    id: newDocRef.id,
    name: addNewHamster.name,
    age: addNewHamster.age,
    favFood: addNewHamster.favFood,
    loves: addNewHamster.loves,
    imgName: addNewHamster.imgName,
    wins: addNewHamster.wins,
    defeats: addNewHamster.defeats,
    games: addNewHamster.games,
  };

  res.send(Objekt);
});

router.put("/:id", async (req, res) => {
  const oldDocId = req.params.id;

  const collectionRef = collection(db, "hamsters");
  const oldDocRef = doc(collectionRef, oldDocId);
  const snapShot1 = await getDoc(oldDocRef);
  let newObject = req.body;

  try {
    if (!snapShot1.exists()) {
      res.sendStatus(404);
      return;
    } else if (!Object.keys(req.body).length) {
      res.sendStatus(400);
      return;
    }
    await updateDoc(oldDocRef, newObject);
  } catch (error) {
    res.sendStatus(500);
    return;
  }
  res.sendStatus(200);
});

router.delete("/:id", async (req, res) => {
  const toBeChanged = req.params.id;
  const docRef = doc(db, "hamsters", toBeChanged);
  const docSnap = await getDoc(docRef);

  const colRef = collection(db, "hamsters");

  const docNewRef = doc(colRef, toBeChanged);

  const deleteDocument = await deleteDoc(docNewRef);

  if (docSnap.exists()) {
    res.send(deleteDocument);
    return;
  } else {
    res.sendStatus(404);
  }
});
export default router;

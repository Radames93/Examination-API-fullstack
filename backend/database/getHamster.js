import { collection, getDocs, doc, getDoc } from "firebase/firestore";

import { db } from "./firebase.js";

const colRef = collection(db, "hamsters");
let hamsters = [];

getDocs(colRef).then((snapshot) => {
  snapshot.docs.forEach((docSnapshot) => {
    hamsters.push({ ...docSnapshot.data(), id: docSnapshot.id });
  });
  console.log(hamsters);
});

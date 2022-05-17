// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { createRequire } from "module";
const require = createRequire(import.meta.url);
let firebaseConfig;
if (process.env.PRIVATE_KEY) {
  firebaseConfig = JSON.parse(process.env.PRIVATE_KEY);
} else {
  firebaseConfig = require("./FirebaseJsonConfig.json");
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

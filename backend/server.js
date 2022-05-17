import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
const app = express();
const PORT = process.env.PORT || 1177;

import hamsters from "./routes/newHamsters.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const staticFolder = path.join(__dirname, "public");

const distPath = path.join(__dirname, "/../dist/");
console.log("distpath:", distPath);

app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`Logger: ${req.method}  ${req.url} `, req.body);
  next();
});

app.use(express.static(distPath));

app.use(express.static(staticFolder));

app.use("/hamsters", hamsters);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}.`);
});

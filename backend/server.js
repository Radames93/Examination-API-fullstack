const express = require("express");
const app = express();

const path = require("path");
const cors = require("cors");
const hamsters = require("./routes/hamsters.js");
const winners = require("./routes/winners.js");
const losers = require("./routes/losers.js");

const PORT = process.env.PORT || 1177;
//const staticFolder = path.join(__dirname, 'public');
const distPath = path.join(__dirname, "/../dist/");
console.log("distpath:", distPath);
const picsFolder = path.join(__dirname, "hamsterImg");
const hamtaroFolder = path.join(__dirname, "images");
//Middleware
app.use(express.urlencoded({ extended: true }));
app.use((req, _res, next) => {
  console.log(`${req.method} ${req.url}`, req.params);
  next();
});

app.use(express.json());
app.use(cors());
app.use(express.static(distPath));
//app.use( express.static(staticFolder) );
app.use("/hamsterImg", express.static(picsFolder));
app.use("/img", express.static(path.join(__dirname, "/hamsterImg/")));
app.use("/images", express.static(hamtaroFolder));
app.use("/imgHamtaro", express.static(path.join(__dirname, "/images/")));

// api for hamsters
app.use("/hamsters/cutest", winners);
app.use("/hamsters/losers", losers);
app.use("/hamsters", hamsters);
// app.use("/matches", matches);
// app.use("/matchWinners", matchWinners);

// Övriga endpoints, för att fungera med React Router i frontend
app.all("*", (req, res) => {
  res.sendFile(distPath + "index.html");
});

//Starting server
app.listen(PORT, () => {
  console.log("Server is listening on port " + PORT);
});

const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;

app.use(cors());

app.listen(PORT, () => console.log("server is connected."));

app.get("/", (req, res) => {
  console.log("seeing");
  res.json("ok");
});

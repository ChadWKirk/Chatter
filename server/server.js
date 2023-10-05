const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("server is connected."));

app.get("/", (req, res) => {
  console.log("seeing");
  res.json("ok");
});

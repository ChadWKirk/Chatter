const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:5173", methods: ["GET", "POST"] },
});
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;
require("dotenv").config({ path: "./config.env" });
const cors = require("cors");
const mysql = require("mysql");
const db = mysql.createConnection({
  host: "chatter.czzxstwgf0a4.us-east-1.rds.amazonaws.com",
  port: "3306",
  user: process.env.AWS_USER,
  password: process.env.AWS_PASSWORD,
  database: "chatter",
});

db.connect((err) => {
  if (err) {
    console.log(err.message);
    return;
  }
  console.log("Database connected.");
});

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.listen(PORT, () => console.log("server is connected."));

app.get("/", (req, res) => {
  console.log("seeing");
  res.json("ok");
});

//person submits name
//name gets put into db along with a token
//gets redirects to /token/name
//online now section pulls names from db
//if user goes to /badtoken/name or just /name it will redirect to home page
//if user exits /token/name, user gets erased from db and removed from online now in chatroom page

//db schemas
//user = id, name, color
//message = id, message, dateSent

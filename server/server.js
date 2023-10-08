const express = require("express");
const app = express();
const PORT = 5000;
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
  database: "chatterInstance",
});

app.listen(PORT, () => {
  console.log(`Server connected on ${PORT}`);
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

app.get("/", (req, res) => {
  console.log("seeing");
  res.json("ok");
});

//person submits name
//name gets put into db along with an id
app.post("/addUser", (req, res) => {
  console.log(req.body);
  var sql = `INSERT INTO Users (name, color) VALUES ('${req.body.name}', 'White')`;
  db.query(sql, function (err, result) {
    if (err) console.log(err);
    console.log(`1 record inserted with name of ${req.body.name}`);
    res.send(result);
  });
});

//online now section pulls names from db
app.post("/checkOnlineUsers", (req, res) => {
  var sql = `SELECT * FROM Users`;
  db.query(sql, function (err, result) {
    if (err) console.log(err);
    res.send(result);
  });
});

//check if user and id in url match up. if not then redirect to home page (on front end)
app.post("/checkUser", (req, res) => {
  var sql = `SELECT name FROM Users WHERE id=${req.body.id}`;
  db.query(sql, function (err, result) {
    if (err) console.log(err);
    res.send(result);
  });
});

//add message into messages table
app.post("/sendMessage", (req, res) => {
  var sql = `INSERT INTO Messages (sender, message) VALUES ('${req.body.name}', '${req.body.message}')`;
  db.query(sql, function (err, result) {
    if (err) console.log(err);
    res.send(result);
    console.log(result);
  });
  console.log(req.body.date);
});

//fetch messages from messages table
app.get("/fetchMessages", (req, res) => {
  var sql = `SELECT * FROM Messages`;
  db.query(sql, function (err, result) {
    if (err) console.log(err);
    res.send(result);
    // console.log(result);
  });
});

//if user exits /token/name, user gets erased from db and removed from online now in chatroom page

//db schemas
//user = id, name, color
//message = id, message, dateSent

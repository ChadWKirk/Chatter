const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: { origin: "http://127.0.0.1:5173", methods: ["GET", "POST"] },
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
io.on("connection", (socket) => {
  console.log(`user connected: ${socket.id}`);

  socket.on("send_message", (data) => {
    console.log("sending message", data);
    io.emit("receive_message", data);
  });

  socket.on("check_users", (data) => {
    var sql = `SELECT * FROM Users`;
    db.query(sql, function (err, result) {
      if (err) console.log(err);
      console.log(result, " USERS");
      io.emit("show_users", result);
    });
  });

  socket.on("close", (data) => {
    var sql = `DELETE FROM Users WHERE id='${data.id}'`;
    db.query(sql, function (err, result) {
      if (err) console.log(err);
      console.log(`1 record deleted with id of ${data.id}`);
    });
    var sql2 = `SELECT * FROM Users`;
    db.query(sql2, function (err, result) {
      if (err) console.log(err);
      console.log(result, " USERS");
      io.emit("show_users", result);
    });
  });
});
server.listen(port, () => console.log(`Listening on port ${port}`));

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
  var sql = `INSERT INTO Messages (sender, message, date) VALUES ('${req.body.name}', '${req.body.message}', '${req.body.date}')`;
  db.query(sql, function (err, result) {
    if (err) console.log(err);
    res.send(result);
    console.log(sql);
  });
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

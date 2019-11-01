// implement your API here
const express = require("express");
const db = require("./data/db.js");

const server = express();

server.listen(4001, () => {
  console.log("=== Server Listening on Port 4000 ===");
});

server.use(express.json());

//Standard API Call
server.get("/", (req, res) => {
  res.send("Hello, World.");
});

//Get All Users
server.get("/users", (req, res) => {
  db.find().then(users => {
    res.status(200).json({ users: users });
  });
});

//Get Specific User
server.get("/user/:id", (req, res) => {
  const { id } = req.params;
  db.findById(id).then(user => {
    res.status(200).json({ user: user });
  });
});

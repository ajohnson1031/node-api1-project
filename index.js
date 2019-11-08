// implement your API here
const express = require("express");
const db = require("./data/db.js");
const cors = require("cors");

const server = express();

server.listen(4000, () => {
  console.log("=== Server Listening on Port 4000 ===");
});

server.use(express.json());
server.use(cors());

//Standard API Call
server.get("/", (req, res) => {
  res.send("Hello, World.");
});

//Get All Users
server.get("/users", (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json({ users: users });
    })
    .catch(err =>
      res
        .status(500)
        .json({ error: "The user's information could not be retrieved." })
    );
});

//Get Specific User
server.get("/users/:id", (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(user => {
      user
        ? res.status(200).json({ user: user })
        : res.status(404).json({
            message: "The user with the specified ID does not exist."
          });
    })
    .catch(err =>
      res
        .status(500)
        .json({ error: "The user information could not be retrieved." })
    );
});

//Add New User
server.post("/users", (req, res) => {
  const userInfo = req.body;

  !userInfo.name || !userInfo.bio
    ? res
        .status(400)
        .json({ errorMessage: "Please provide name and bio for the user." })
    : db
        .insert(userInfo)
        .then(user => res.status(201).json({ success: true, user }))
        .catch(err =>
          res.status(500).json({
            error: "There was an error while saving the user to the database"
          })
        );
});

//Update User
server.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const userInfo = req.body;

  !userInfo.name || !userInfo.bio
    ? res
        .status(400)
        .json({ errorMessage: "Please provide name and bio for the user." })
    : db
        .update(id, userInfo)
        .then(user => {
          if (user) res.status(200).json({ success: true, user });
          else
            res
              .status(404)
              .json({ message: `User with id ${id} does not exist...` });
        })
        .catch(err =>
          res
            .status(500)
            .json({ error: "The user information could not be modified." })
        );
});

//Delete User
server.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(deletedUser => {
      if (deletedUser) res.status(204).end();
      else
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
    })
    .catch(err =>
      res.status(500).json({ error: "The user could not be removed" })
    );
});

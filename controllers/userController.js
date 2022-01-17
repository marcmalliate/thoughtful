const { Users } = require("../models");

module.exports = {
  // get all users
  getUsers(req, res) {
    Users.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  // get a user by ID
  getSingleUser(req, res) {
    Users.findOne({ _id: req.params.id })
      .select("-__v")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // create a new user
  createUser(req, res) {
    Users.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  // update a single user by id
  updateUser(req, res) {
    Users.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true, runValidators: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with this ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // delete a user by id
  deleteUser(req, res) {
    Users.findByIdAndRemove({ _id: req.params.id })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with this ID" })
          : res.json({ message: "User has been removed" })
      )
      .catch((err) => res.status(500).json(err));
  },

  // add a friend
  addFriend(req, res) {
    Users.findOneAndUpdate(
      { _id: req.params.id },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json({ message: "Enjoy your new friend" })
      )
      .catch((err) => res.status(500).json(err));
  },

  // delete a friend
  deleteFriend(req, res) {
    Users.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: "Sorry, No friends found with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};

const { Users } = require("../models");

module.exports = {
  // Gets all users
  getUsers(req, res) {
    Users.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  // Gets a user by ID
  getSingleUser(req, res) {
    Users.findOne({ _id: req.params.id })
      .select("-__v")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "Sorry, no user with that ID." })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Creates a new user
  createUser(req, res) {
    Users.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  // Updates a single user by id
  updateUser(req, res) {
    Users.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true, runValidators: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "Sorry, no user with this ID." })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Deletes a user by id
  deleteUser(req, res) {
    Users.findByIdAndRemove({ _id: req.params.id })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "Sorry, No user with this ID." })
          : res.json({ message: "This user has successfully been removed." })
      )
      .catch((err) => res.status(500).json(err));
  },

  // Adds a friend
  addFriend(req, res) {
    Users.findOneAndUpdate(
      { _id: req.params.id },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "Sorry, no user with that ID." })
          : res.json({ message: "Yay! You have a new friend." })
      )
      .catch((err) => res.status(500).json(err));
  },

  // Deletes a friend
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
              .json({ message: "Sorry, no friend found with that ID." })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};

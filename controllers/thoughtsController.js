const { Thoughts, Users } = require("../models");

module.exports = {
  // Gets all thoughts
  getThoughts(req, res) {
    Thoughts.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Gets a single thought by id
  getSingleThought(req, res) {
    Thoughts.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "Sorry, no thought with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Creates a new thought
  createThought({ params, body }, res) {
    console.log(params);
    console.log(body);
    // Console log user id and the thought
    Thoughts.create(body)
      .then(({ _id }) => {
        return Users.findOneAndUpdate(
          { _id: params.id },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((newThought) =>
        !newThought
          ? res.status(404).json({ message: "Sorry, no thought with that ID" })
          : res.json(newThought)
      )
      .catch((err) => res.json(err));
  },

  // Updates a thought by id
  updateThought(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { new: true, runValidators: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with this ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Deletes a thought by id
  deleteThought(req, res) {
    Thoughts.findByIdAndRemove({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "Sorry, no thought with this ID" })
          : res.json({ message: "This thought has successfully been removed" })
      )
      .catch((err) => res.status(500).json(err));
  },

  // Creates a new reaction
  createReaction(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: "Sorry, no thought found with that ID" })
          : res.json({
              message:
                "You have successfully added a new reaction to this thought",
            })
      )
      .catch((err) => res.status(500).json(err));
  },

  // Deletes a  reaction
  deleteReaction(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionsId } } },
      { runValidators: true, new: true }
    )
      .then((reaction) =>
        !reaction
          ? res
              .status(404)
              .json({ message: "sorry, no reaction found with that ID" })
          : res.json(reaction)
      )
      .catch((err) => res.status(500).json(err));
  },
};

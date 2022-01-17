const { Thoughts, Users } = require("../models");

module.exports = {
  // get all thoughts.
  getThoughts(req, res) {
    Thoughts.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  // get one thought by id.
  getSingleThought(req, res) {
    Thoughts.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },


  // Creates a new thought.
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => res.jason(thought))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },


    // Updates a thought by id.
    updateThought(req, res) {
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      )
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: "No thought with this ID" })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },

    // Deletes a thought by id.
    deleteThought({ params, body}, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then(deletedThought => {
            if (!deletedThought) {
                return res.status(404).json({ message: 'No thought with this ID!'})
            }
            res.json(deletedThought);
        })
        .catch(err => res.json(err));
    }


    // Adds a reaction
    addReaction ({ params, body}, res) {
      Thought.findOneAndUpdate(
          { _id: params.thoughtId },
          { $push: { reactions: body } },
          { new: true, runValidators: true }
      )
      .then(dbThoughtData => {
          if (!dbThoughtData) {
              res.status(404).json({ message: 'No thought with this ID!' });
              return;
          }
          res.json(dbThoughtData)
      })
      .catch(err => res.json(err));
  },

  // Deletes a Reaction
  removeReaction({ params }, res) {
      Thought.findOneAndUpdate(
          { _id: params.thoughtId },
          { $pull: { reactions: { reactionId: params.reactionId } } },
          { new: true }
      )
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => res.json(err));
  },

};

module.exports = thoughtController
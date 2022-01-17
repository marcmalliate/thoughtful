const router = require("express").Router();

const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require("../../controllers/thoughtsController");

// api/thoughts/, Used to get and post thoughts.
router.route("/").get(getThoughts);

// api/thoughts/:id user id
router.route("/:id").post(createThought);

// api/thoughts/:thoughtId
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

router.route("/:thoughtId/reactions").put(createReaction);

router.route("/:thoughtId/:reactionsId").delete(deleteReaction);

module.exports = router;

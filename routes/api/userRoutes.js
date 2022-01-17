const router = require("express").Router();

const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/userController");

// api/users/, GET AND POST USERS
router.route("/").get(getUsers).post(createUser);

// api/users/:id
router.route("/:id").get(getSingleUser).put(updateUser).delete(deleteUser);

// add friend api/users/:id/friends/:friendId
router.route("/:id/friends/:friendId").post(addFriend).delete(deleteFriend);

module.exports = router;

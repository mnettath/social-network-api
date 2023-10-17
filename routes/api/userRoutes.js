const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
} = require("../../controllers/userController");

// http://localhost:3001/api/users/
router.route("/").get(getUsers).post(createUser);

// http://localhost:3001/api/users/:userId
router.route("/:userId").get(getSingleUser);

module.exports = router;

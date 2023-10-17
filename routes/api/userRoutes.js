const router = require("express").Router();
const { getUsers } = require("../../controllers/userController");

// http://localhost:3001/api/users/
router.route("/").get(getUsers);

module.exports = router;

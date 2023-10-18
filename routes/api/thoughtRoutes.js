const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
} = require("../../controllers/thoughtController");

// http://localhost:3001/api/thoughts
router.route("/").get(getThoughts).post(createThought);

// http://localhost:3001/api/thoughts/:thoughtId
router.route("/:thoughtId").get(getSingleThought);

module.exports = router;

const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
} = require("../../controllers/thoughtController");
const {
  createReaction,
  deleteReaction,
} = require("../../controllers/reactionController");

// http://localhost:3001/api/thoughts
router.route("/").get(getThoughts).post(createThought);

// http://localhost:3001/api/thoughts/:thoughtId
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// http://localhost:3001/api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions").post(createReaction);

module.exports = router;

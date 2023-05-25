const router = require("express").Router();

const {
    getThoughts,
    getSingleThought,
    addThought,
    updateThought,
    removeThought,
    addReaction,
    removeReaction,
} = require("../../controllers/thoughtController");

router.route("/").get(getThoughts).post(addThought);

router.route("/:thoughtId").get(getSingleThought).put(updateThought).put(removeThought);

router.route("/:thoughtId/reactions/").post(addReaction);

router.route("/:thoughtId/reactions/:reactionId").put(removeReaction);

module.exports = router;
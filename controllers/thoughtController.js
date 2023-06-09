const { User, Thought } = require("../models/index");

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughtsData = await Thought.find();
            res.status(200).json(thoughtsData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getSingleThought(req, res) {
        try {
            const thoughtData = await Thought.findOne({ _id: req.params.thoughtId })
                .select("-__v")
                .select("-reactions._id");
            if (!thoughtData) {
                res.status(400).json({ message: `No thought with that ID found` });
                return;
            }
            res.status(200).json(thoughtData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async addThought(req, res) {
        try {
            const thoughtData = await Thought.create(req.body);
            const userData = await User.findOneAndUpdate(
                { username: req.body.username },
                { $addToSet: { thoughts: thoughtData._id } },
                { runValidators: true, new: true },
            );
            if (!userData) {
                res.status(400).json({ message: `No user with that ID found` });
                return;
            }
            res.status(200).json(thoughtData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async updateThought(req, res) {
        try {
            const thoughtData = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true },
            )
            if (!thoughtData) {
                res.status(400).json({ message: `No thought with that ID found` });
                return;
            }
            res.status(200).json(thoughtData);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async removeThought(req, res) {
        try {
            const thoughtData = await Thought.findOneAndDelete(
                { _id: req.params.thoughtId },
            )
            if (!thoughtData) {
                res.status(400).json({ message: `No thought with that ID found` });
                return;
            }
            const userData = await User.findOneAndUpdate(
                { _id: thoughtData.userId },
                { $pull: { thoughts: thoughtData._id } },
                { new: true },
            )
            res.status(200).json({ message: `Thought successfully deleted` });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async addReaction(req, res) {
        try {
            const thoughtData = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true },
            )
            if (!thoughtData) {
                res.status(400).json({ message: `No thought with that ID found` });
                return;
            }
            res.status(200).json(thoughtData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async removeReaction(req, res) {
        try {
            const thoughtData = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { runValidators: true, new: true },
            )
            if (!thoughtData) {
                res.status(400).json({ message: `No thought with that ID found` });
                return;
            }
            res.status(200).json(thoughtData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
}
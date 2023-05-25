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
            const thoughtData = await Thought.findOne({ _id: req.params.thoughtId });
            if (!thoughtData) {
                res.status(400).json({ message: `No thought with that ID found` });
                return;
            }
            res.status(200).json(thoughtData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createThought(req, res) {
        try {
            const thoughtData = await Thought.create(req.body);
            const userData = await User.findOneAndUpdate(
                { _id: req.body.userId },
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
                res.status(400).json({message: `No thought with that ID found`});
                return;
            }
            res.status(200).json(thoughtData);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async deleteThought(req, res) {
        try {
            const thoughtData = await Thought.findOneAndDelete(
                {_id: req.params.thoughtId},
            )
        } catch (err) {

        }
    }
}
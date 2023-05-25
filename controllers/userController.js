const { User, Thought } = require("../models/index");

module.exports = {
    async getUsers(req, res) {
        try {
            const usersData = await User.find();
            res.status(200).json(usersData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getSingleUser(req, res) {
        try {
            const userData = await User.findOne({ _id: req.params.userId })
                .select("-__v")
                .populate("thoughts")
                .populate({ path: "friends", select: "-thoughts" });
            if (!userData) {
                res.status(400).json({ message: `No user with that ID found` });
                return;
            }
            res.status(200).json(userData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createUser(req, res) {
        try {
            const userData = await User.create(req.body);
            res.status(200).json(userData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async updateUser(req, res) {
        try {
            const userData = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true },
            )
            if (!userData) {
                res.status(400).json({ message: `No user with that ID found` });
                return;
            }
            res.status(200).json({ message: `User's info updated successfully` });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteUser(req, res) {
        try {
            const userData = await User.findOneAndDelete(
                { _id: req.params.userId },
            );
            if (!userData) {
                res.status(400).json({ message: `No user with that ID found` });
                return;
            }
            const thoughtsData = await Thought.deleteMany({ username: { $in: userData.username } })

            res.status(200).json({ message: `User deleted successfully` });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async addFriend(req, res) {
        try {
            const userData = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { runValidators: true, new: true },
            )
            if (!userData) {
                res.status(400).json({ message: `No user with that ID found` });
                return;
            }
            const friendData = await User.findOneAndUpdate(
                { _id: req.params.friendId },
                { $addToSet: { friends: req.params.userId } },
                { runValidators: true, new: true },
            )
            if (!friendData) {
                res.status(400).json({ message: `No user with that ID found` });
                return;
            }
            res.status(200).json({ message: `Friend has been successfully added` });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async removeFriend(req, res) {
        try {
            const userData = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { runValidators: true, new: true },
            )
            if (!userData) {
                res.status(400).json({ message: `No user with that ID found` });
                return;
            }
            const friendData = await User.findOneAndUpdate(
                { _id: req.params.friendId },
                { $pull: { friends: req.params.userId } },
                { runValidators: true, new: true },
            )
            if (!friendData) {
                res.status(400).json({ message: `No user with that ID found` });
                return;
            }
            res.status(200).json({ message: `Friend has been successfully removed` });
        } catch (err) {
            res.status(500).json(err);
        }
    },
};
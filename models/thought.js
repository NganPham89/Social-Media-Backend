const { Schema, model } = require("mongoose");
const dayjs = require("dayjs");
const reactionSchema = require("./reaction");

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280,
            minlenght: 1,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (date) => dayjs(date).format('DD/MM/YYYY'),
        },
        username: {
            type: String,
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "user"
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    },
);

thoughtSchema.virtual("reactionCount")
    .get(function () {
        return this.reactions.length;
    });

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
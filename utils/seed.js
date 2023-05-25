const connection = require("../config/connection");
const { User, Thought } = require("../models/index");
const { userNames, getRandomThoughts } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
    console.log("connected");

    await User.deleteMany({});
    await Thought.deleteMany({});

    const users = [];
    const thoughts = getRandomThoughts(2);

    for (let i = 0; i < userNames.length; i++ ) {
        const username = userNames[i];
        const email = `${userNames[i]}${Math.floor(Math.random() * 90)}@email.com`;
        
        users.push({
            username,
            email,
        });
    }

    await User.collection.insertMany(users);
    await Thought.collection.insertMany(thoughts);

    console.table(users);
    console.table(thoughts);
    console.info("seeding complete");
    process.exit(0);
})
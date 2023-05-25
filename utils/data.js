const userNames = [
    "lunaSparkle",
    "crimsonNinja",
    "electricDreamer",
    "wanderJourney",
    "pixelGuru",
    "sereneWhisper",
]

const thoughtsArr = [
    "Why don't scientists trust atoms? Because they make up everything!",
    "I'm reading a book about anti-gravity. It's impossible to put down!",
    "Why did the scarecrow win an award? Because he was outstanding in his field!",
    "Why don't skeletons fight each other? They don't have the guts!",
    "I'm friends with 25 letters of the alphabet. I don't know why!",
    "How do you organize a space party? You planet!",
    "Why did the bicycle fall over? Because it was two-tired!",
    "What's the best time to go to the dentist? Tooth-hurty!",
    "Why did the tomato turn red? Because it saw the salad dressing!",
    "What do you call fake spaghetti? An impasta!",
    "I used to be a baker, but I couldn't make enough dough.",
    "Why don't eggs tell jokes? They might crack up!",
    "How do you make a tissue dance? You put a little boogie in it!",
    "Why did the golfer bring two pairs of pants? In case he got a hole in one!",
    "I'm on a whiskey diet. I've lost three days already!",
    "What did one wall say to the other wall? I'll meet you at the corner!",
    "How does a penguin build its house? Igloos it together!",
    "I told my wife she should embrace her mistakes. She gave me a hug.",
    "Why don't scientists trust atoms? Because they make up everything!",
]

const reactionsArr = [
    "LOL",
    "That's hilarious!",
    "lmao",
    "hahahaha",
    "not funny",
]

const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];

const getRandomThoughts = (int) => {
    const results = [];
    for (let i = 0; i < int; i++) {
        results.push({
            thoughtText: getRandomItem(thoughtsArr),
            username: getRandomItem(userNames),
            reactions: [...getRandomReactions(3)],
        });
    }
    return results;
}

const getRandomReactions = (int) => {
    const results = [];
    for (let i = 0; i < int; i++) {
        results.push({
            reactionBody: getRandomItem(reactionsArr),
            username: getRandomItem(userNames),
        });
    }
    return results;
}

module.exports = { userNames, getRandomThoughts };
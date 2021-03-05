const tips = [
    "You can check warns and basic info about a member by executing the .userlog command.",
    "The dashboard and docs website of the bot is in development.",
    "For extended support, join our support server: <>",
    ""
    ]
  
const tip = tips[Math.floor(Math.random() * tips.length)]

module.exports = tip;
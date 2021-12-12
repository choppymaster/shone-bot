import srod = require("something-random-on-discord");

export const Command = {
  run: async (client, message, args) => {
  const meme = await srod.Random.getMeme();
  message.channel.send({ embeds: [meme] });
},

config: {
  name: "meme",
  description: "Gives you a random meme",
  permissions: ["SEND_MESSAGES"]
}
}

import srod = require("something-random-on-discord");

export const Command = {
  run: async (client, message, args) => {
  const joke = await srod.Random.getJoke();
  joke.embed.footer.text = "";
  message.channel.send(joke);
},

config: {
  name: "joke",
  description: "Gives you a random joke",
  permissions: ["SEND_MESSAGES"]
}
}

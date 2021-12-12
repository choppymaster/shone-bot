import srod = require("something-random-on-discord");

export const Command = {
  run: async (client, message, args) => {
  const advice = await srod.Random.getAdvice();
  message.channel.send({ embeds: [advice] });
},

config: {
  name: "advice",
  description: "Gives you a random advice.",
  permissions: ["SEND_MESSAGES"]
}
}

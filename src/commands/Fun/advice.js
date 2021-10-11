const srod = require("something-random-on-discord");

module.exports.run = async (client, message, args) => {
  const advice = await srod.Random.getAdvice();
  message.channel.send({ embeds: [advice] });
};

module.exports.config = {
  name: "advice",
  description: "Gives you a random advice.",
  permissions: ["SEND_MESSAGES"]
};

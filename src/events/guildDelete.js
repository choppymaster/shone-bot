const { Guild } = require("../common").Schemas;

module.exports.run = async (client, guild) => {
  client.logger.info(`${guild.id} removed me.`);

  await Guild.findOneAndDelete({ id: guild.id });
};

const { Guild } = require("../common").Schemas;

module.exports.run = async (client, guild) => {
  client.logger.info(`Joined new guild! ${guild.name} | ${guild.id}`);

  await new Guild({
    id: guild.id
  }).save();

  guild.registerSlashCommands(client);
};

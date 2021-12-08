import { Schemas } from "../common";

export const Event = async (client, guild) => {
  client.logger.info(`Joined new guild! ${guild.name} | ${guild.id}`);

  await new Schemas.Guild({
    id: guild.id
  }).save();

  guild.registerSlashCommands(client);
};

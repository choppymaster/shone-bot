import { Schemas } from "../common";

export const Event = async (client, guild) => {
  client.logger.info(`${guild.id} removed me.`);

  await Schemas.Guild.findOneAndDelete({ id: guild.id });
};

import { Schemas } from "../common";

export const Event = async client => {
  require("../core/database")(client);
  client.guilds.cache.forEach(async guild => {
    guild.registerSlashCommands(client);

    guild.members.fetch();

    if (!await guild.fetchData()) return client.emit("guildCreate", guild);
    const data = await Schemas.Guild.find({});
    if (data.length > client.guilds.cache.size) {
      const guildIds: number[] = [];
      for (let i = 0; i < client.guilds.cache.size; i++) {
        guildIds.push([...client.guilds.cache.values()][i].id);
      }

      data.forEach(dat => {
        if (!guildIds.includes(dat.id)) client.emit("guildDelete", { id: dat.id });
      });
    }
  });

  client.logger.info("Fetched all guilds and its members.");

  client.user.setPresence({ activity: { name: "Super Mario Bros 2", type: "PLAYING" }, status: "idle" });

  client.logger.info("Established full connection to discord.");
};

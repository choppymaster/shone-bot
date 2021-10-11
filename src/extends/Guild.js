const { Guild } = require("discord.js");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

Object.defineProperties(Guild.prototype, {
  registerSlashCommands: {
    value: async function(client) {
      const rest = new REST({ version: "9" }).setToken(client.config.token);
		    await rest.put(
        Routes.applicationGuildCommands(client.config.clientId, this.id),
        { body: client.slash }
      );
    }
  }
});

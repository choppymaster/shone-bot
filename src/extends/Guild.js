const { Guild } = require("discord.js");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { Guild: GuildSchema } = require("../common").Schemas;

Object.defineProperties(Guild.prototype, {
  // register slash commands
  registerSlashCommands: {
    value: async function(client) {
      const rest = new REST({ version: "9" }).setToken(client.config.token);
		    await rest.put(
        Routes.applicationGuildCommands(client.config.clientId, this.id),
        { body: client.slash }
      );
    }
  },
  // return data of the guild
  fetchData: {
    value: async function() {
      const data = await GuildSchema.findOne({
        id: this.id
      });
      return data;
    }
  },
  // updates guild data
  updateGuildData: {
    value: async function(updation) {
      return await GuildSchema.findOneAndUpdate({ id: this.id }, updation);
    }
  }
});

import { Guild } from "discord.js";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { Schemas } from "../common";
const GuildSchema = Schemas.Guild

Object.defineProperties(Guild.prototype, {
  // register slash commands
  registerSlashCommands: {
    value: async function(client: any) {
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
    value: async function(updation: {}) {
      return await GuildSchema.findOneAndUpdate({ id: this.id }, updation);
    }
  }
});

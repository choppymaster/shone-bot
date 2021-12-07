import { GuildMember } from "discord.js";

export = Object.defineProperties(GuildMember.prototype, {
  fetchWarns: {
    value: async function() {
      const warns = await require("../common").Schemas.Warn.find({
        userID: this.id,
        guildID: this.guild.id
      });
      return warns;
    }
  }
});

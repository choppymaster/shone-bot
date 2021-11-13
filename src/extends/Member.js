const { GuildMember } = require("discord.js");

module.exports = Object.defineProperties(GuildMember.prototype, {
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

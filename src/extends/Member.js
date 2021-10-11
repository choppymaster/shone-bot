const { GuildMember } = require("discord.js");

module.exports = Object.defineProperties(GuildMember.prototype, {
  warns: {
    value: [],
    writable: true
  },
  fetchWarns: {
    value: async function() {
      const warns = await require("../common").Schemas.warns.find({
        userID: this.id,
        guildID: this.guild.id
      });
      this.warns = warns;
      return this.warns;
    }
  }
});

const { Structures } = require("discord.js");

module.exports = Structures.extend("GuildMember", member => {
	class MemberStructure extends member {
		constructor(client, data, guild) {
			super(client, data, guild);
			this.warns = [];
		}
		async updateWarns() {
			this.warns = await require("./common").Schemas.warns.find({
				userID: this.id,
				guildID: this.guild.id,
			});
		}
	}
	return MemberStructure;
});
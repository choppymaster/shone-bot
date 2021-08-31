const { Client, Collection, Intents } = require("discord.js");

module.exports = class extends Client {
	constructor() {
		super({
           intents: [
               Intents.FLAGS.GUILDS,
               Intents.FLAGS.GUILD_MESSAGES,
               Intents.FLAGS.DIRECT_MESSAGES,
               Intents.FLAGS.GUILD_MEMBERS,
               Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
               Intents.FLAGS.GUILD_PRESENCES,
               Intents.FLAGS.GUILD_BANS
           ] 
        });
        
		this.config = require("./config");

		this.logger = require("./common").Logger;

		this.commands = new Collection();

	}

};
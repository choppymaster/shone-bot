const { Client, Collection, Intents } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

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
				Intents.FLAGS.GUILD_BANS,
			],
		});

		this.config = require("./config");

		this.logger = require("./common").Logger;

		this.commands = new Collection();

		this.slash = [];
	}
	async loadApplicationCommand(command) {
		let builder;
		if (command.execute) {
			builder = new SlashCommandBuilder();
			builder.setName(command.config?.name)?.setDescription(command.config?.description);
		}
		const slash = command.slashCommand;
		if (slash) {
			slash.options.forEach(option => {
				const add = options => options.setName(option.name).setDescription(option.description).setRequired(option.required);
				switch (option.type) {
				case "STRING": builder.addStringOption(add); break;
				case "USER": builder.addUserOption(add); break;
				case "CHANNEL": builder.addChannelOption(add); break;
				case "INTEGER": builder.addIntegerOption(add); break;
				}
			});
		}
		if (builder) this.slash.push(builder.toJSON());
	}
};
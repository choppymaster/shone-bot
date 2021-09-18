const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

module.exports.run = async client => {
	require("../database")(client);
	client.guilds.cache.forEach(async guild => {
		const rest = new REST({ version: "9" }).setToken(client.config.token);
		await rest.put(
			Routes.applicationGuildCommands(client.config.clientId, guild.id),
			{ body: client.slash },
		);
		guild.members.fetch();
		guild.members.cache.forEach(async member => {
		  await member.fetchWarns();
		});
	});

	client.logger.info("Fetched all guilds and its members.");

	client.user.setPresence({ activity: { name: "Super Mario Bros 2", type: "PLAYING" }, status: "idle" });

	client.logger.info("Established full connection to discord.");

};

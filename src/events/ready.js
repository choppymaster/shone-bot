module.exports.run = async client => {
	require("../database")(client);
	client.guilds.cache.forEach(guild => {
		guild.members.fetch();
		guild.members.cache.forEach(async member => {
		  await member.fetchWarns();
        });
	});

	client.logger.info("Fetched all guilds and its members.");

	client.user.setPresence({ activity: { name: "Super Mario Bros 2", type: "PLAYING" }, status: "idle" });

	client.logger.info("Established full connection to discord.");

};

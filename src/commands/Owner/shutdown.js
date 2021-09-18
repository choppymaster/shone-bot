module.exports = {
	run: async (client, message, args) => {
		await message.channel.send("Goodbye 👋");
		await client.logger.debug("Shutdown.");
		await client.destroy();
		process.exit();
	},
	execute: async (client, interaction, guild) => {
		await interaction.reply("Goodbye 👋");
		await client.logger.debug("shutdown.");
		await client.destroy();
		process.exit();
	},
	config: {
		name: "shutdown",
        description: "Shutdown the bot.",
		botMaster: true,
	},
};
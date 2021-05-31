module.exports.run = async (client, message) => {
	const prefix = ".";
	if (message.author.bot || !message.content.startsWith(prefix)) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const commandName = args.shift().toLowerCase();

	// command
	if (!client.commands.has(commandName)) return;
	const command = client.commands.get(commandName);

	let not = false;

	if (command.config.botMaster && message.author.id !== process.env.BOTMASTER) {
		not = true;
		return;
	}

	if (command.config.guildOnly && message.channel.type === "dm") {
		message.delete();
		message.channel.send("This command cant be executed in DMs").then(m => m.delete({ timeout: 10000 }));
		not = true;
		return;
	}

	if (command.config.permissions) {
		const authorPerms = message.channel.permissionsFor(message.author);
		if (!authorPerms || !authorPerms.has(command.config.permissions)) {
	             message.channel.send("Insufficient permissions");
			not = true;
			return;
		}
	}

	if (not === false) {
		try {
			command.run(client, message, args);
		}
		catch (error) {
	  client.logger.error(error);
			message.channel.send(`Sorry! There was an error while executing the command! \nError: ${error}`);
		}

		client.logger.verbose(`${message.author.tag} | ${message.author.id} command: ${command.config.name} Guild: ${message.guild === null ? "in DMs" : message.guild.name} | ${message.guild === null ? "" : message.guild.id}`);
	}
};
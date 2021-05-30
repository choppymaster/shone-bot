module.exports.run = async (client, message) => {
        const prefix = ".";
	if (message.author.bot || !message.content.startsWith(prefix)) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const commandName = args.shift().toLowerCase();

	// command
	if (!client.commands.has(commandName)) return;
	const command = client.commands.get(commandName);

	try {
		command.run(client, message, args);
	}
	catch (error) {
	  client.logger.error(error)
			message.channel.send(`Sorry! There was an error while executing the command! \nError: ${error}`)
	}

	client.logger.verbose(`${message.author.tag} | ${message.author.id} command: ${command.config.name} Guild: ${message.guild} | ${message.guild.id}`);

	// permissions
	if (command.config.permissions) {
		const authorPerms = message.channel.permissionsFor(message.author);
		if (!authorPerms || !authorPerms.has(command.config.permissions)) {
			return message.channel.send("Insufficient permissions");

		}
	}

	if (command.config.guildOnly && message.channel.type === "dm") {
		message.delete();
		return message.channel.send("This command cant be executed in DMs").then(m => m.delete({ timeout: 10000 }));
	}

	if (command.config.botMaster && message.author.id !== process.env.BOTMASTER) return;

};
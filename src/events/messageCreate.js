const { Permissions } = require("discord.js");

module.exports.run = async (client, message) => {
  const prefix = ".";
  if (message.author.bot || !message.content.startsWith(prefix)) return;

  if (message.channel.partial) await message.channel.fetch();

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const commandName = args.shift().toLowerCase();

  // command
  if (!client.commands.has(commandName)) return;
  const command = client.commands.get(commandName);

  if (command.config.botMaster && !message.author.id === client.config.botMaster) return;

  if (command.config.guildOnly && (message.guild === null)) {
    message.channel.send("This command cant be executed in DMs").then(m => m.delete({ timeout: 10000 }));
  }

  if (message.guild && command.config.permissions) {
    const authorPerms = message.channel.permissionsFor(message.author);
    if (!authorPerms || !authorPerms.has(Permissions.FLAGS[command.config.permissions])) return message.channel.send("Insufficient permissions");
  }
  try {
    command.run(client, message, args);
  } catch (error) {
	  client.logger.error(error);
    message.channel.send(`Sorry! There was an error while executing the command! \nError: ${error}`);
  }

  client.logger.verbose(`${message.author.tag} | ${message.author.id} command: ${command.config.name} Guild: ${message.guild === null ? "in DMs" : message.guild.name} | ${message.guild === null ? "" : message.guild.id}`);
};

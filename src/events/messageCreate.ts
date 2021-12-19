import { Permissions } from "discord.js";

export const Event = async (client, message) => {
  const prefix = ".";
  if (message.author.bot || !message.content.startsWith(prefix)) return;

  if (message.channel.partial) await message.channel.fetch();

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const commandName = args.shift().toLowerCase();

  // command
  if (client.commands.has(commandName) || client.aliases.has(commandName)) {
    const command = client.commands.get(commandName) ?? client.aliases.get(commandName);

    if (command.ownerOnly && !message.author.id === client.config.botMaster) return;

    if (command.guildOnly && (message.guild === null)) return message.channel.send("This command cant be executed in DMs").then(m => m.delete({ timeout: 10000 }));

    if (!message.channel.permissionsFor(client.user).has(Permissions.FLAGS.SEND_MESSAGES)) return;

    if (message.guild) {
      if (command.userPermissions) {
        const userNeededPermissions: string[] = [];
        command.userPermissions.forEach(perm => {
          const authorPerms = message.channel.permissionsFor(message.author);
          if (!authorPerms || !authorPerms.has(Permissions.FLAGS[perm])) userNeededPermissions.push(perm);
        });
        if (userNeededPermissions.length) return message.channel.send(`Insufficient permissions for user. Needed ${userNeededPermissions.join(", ")} permissions.`);
      }

      if (command.clientPermissions) {
        const clientNeededPermissions: string[] = [];
        command.clientPermissions.forEach(perm => {
          const authorPerms = message.channel.permissionsFor(client.user);
          if (!authorPerms || !authorPerms.has(Permissions.FLAGS[perm])) clientNeededPermissions.push(perm);
        });
        if (clientNeededPermissions.length) return message.channel.send(`Insufficient permissions for me. Needed ${clientNeededPermissions.join(", ")} permissions.`);
      }
    }

    try {
      command.run(client, message, args);
    } catch (error) {
	  client.logger.error(error);
      message.channel.send(`Sorry! There was an error while executing the command! \nError: ${error}`);
    }

    client.logger.verbose(`${message.author.tag} | ${message.author.id} command: ${command.name} Guild: ${message.guild === null ? "in DMs" : message.guild.name} | ${message.guild === null ? "" : message.guild.id}`);
  }
};

import { Collection, Permissions } from "discord.js";

export const Event = async (client, message) => {
  const prefix = ".";
  if (message.author.bot) return;

  if (message.channel.partial) await message.channel.fetch();

  if (message.content.startsWith(prefix)) {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const commandName = args.shift().toLowerCase();

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

      if (!client.cooldowns.has(command.name)) {
        client.cooldowns.set(command.name, new Collection());
      }

      const now = Date.now();
      const timestamps = client.cooldowns.get(command.name);
      const cooldownAmount = command.cooldown;
      if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
          const timeLeft = (expirationTime - now) / 1000;
          return message.channel.send(`You need to wait ${timeLeft.toFixed(1)} seconds to use this command.`);
        }
      }

      try {
        command.run(client, message, args);
      } catch (error) {
	    client.logger.error(error);
        return message.channel.send(`Sorry! There was an error while executing the command! \nError: ${error}`);
      }

      timestamps.set(message.author.id, now);
      setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

      client.logger.verbose(`${message.author.tag} | ${message.author.id} command: ${command.name} Guild: ${message.guild === null ? "in DMs" : message.guild.name} | ${message.guild === null ? "" : message.guild.id}`);
    }
  }
};

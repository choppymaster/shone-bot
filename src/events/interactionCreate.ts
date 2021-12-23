import { Permissions } from "discord.js";

export const Event = async (client, interaction) => {
  if (interaction.isCommand()) {
    const command = client.commands.get(interaction.commandName);

    if (interaction.guild) {
      if (command.userPermissions) {
        const userNeededPermissions: string[] = [];
        command.userPermissions.forEach(perm => {
          const authorPerms = interaction.channel.permissionsFor(interaction.member.user);
          if (!authorPerms || !authorPerms.has(Permissions.FLAGS[perm])) userNeededPermissions.push(perm);
        });
        if (userNeededPermissions.length) return interaction.reply(`Insufficient permissions for user. Needed ${userNeededPermissions.join(", ")} permissions.`);
      }

      if (command.clientPermissions) {
        const clientNeededPermissions: string[] = [];
        command.clientPermissions.forEach(perm => {
          const authorPerms = interaction.channel.permissionsFor(client.user);
          if (!authorPerms || !authorPerms.has(Permissions.FLAGS[perm])) clientNeededPermissions.push(perm);
        });
        if (clientNeededPermissions.length) return interaction.reply(`Insufficient permissions for me. Needed ${clientNeededPermissions.join(", ")} permissions.`);
      }
    }
    command.execute(client, interaction, interaction.guild);
    client.logger.info(`${interaction.member.user.tag} used slash command ${interaction.commandName} in ${interaction.member.guild.name}`);
  }
};

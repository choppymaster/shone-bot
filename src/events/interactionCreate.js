const { Permissions } = require("discord.js");

module.exports.run = async (client, interaction) => {
  if (interaction.isCommand()) {
    if (!interaction.member.permissions.has(Permissions.FLAGS[client.commands.get(interaction.commandName).permissions])) return interaction.reply("Insufficent permissions.");
    client.commands.get(interaction.commandName).execute(client, interaction, interaction.guild);
    client.logger.info(`${interaction.member.user.tag} used slash command ${interaction.commandName} in ${interaction.member.guild.id}`);
  }
};

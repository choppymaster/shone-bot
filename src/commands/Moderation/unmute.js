module.exports = {
  run: async (client, message, args) => {
    const member = message.mentions.members.first();
    if (!member) return message.channel.send("member not specified");

    const data = await message.guild.fetchData();
    const role = message.guild.roles.cache.get(data.muteRole);
    if (!role) return message.channel.send("Member is not muted");

    await member.roles.remove(role);

    message.channel.send(`${member} is unmuted!`);
  },
  slashCommand: {
    options: [
      {
        name: "member",
        description: "The member you want to unmute",
        type: "USER",
        required: true
      }
    ]
  },
  execute: async (client, interaction, guild) => {
    const member = guild.members.cache.get(interaction.options.getUser("member").id);

    const data = await guild.fetchData();
    const role = guild.roles.cache.get(data.muteRole);
    if (!role) return interaction.reply("Member is not muted");

    await member.roles.remove(role);

    interaction.reply(`${member} is unmuted!`);
  },
  config: {
    name: "unmute",
    description: "Unmutes a member.",
    guildOnly: true,
    permissions: ["SEND_MESSAGES", "MANAGE_ROLES"]
  }
};

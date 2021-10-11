module.exports = {
  run: async (client, message, args) => {
    const member = message.mentions.members.first();
    if (!member) return message.channel.send("You didn't mentioned a user to be defended!");

    const channel = member.guild.channels.cache.get(member.voice.channelId);
    if (!channel) return message.channel.send("The member is not in a voice channel!");

    try {
      await member.voice.setDeaf(true);
      message.channel.send("Member successfully muted on voice channel");
    } catch { }
  },
  slashCommand: {
    options: [
      {
        name: "member",
        description: "The member you want to deafen",
        type: "USER",
        required: true
      }
    ]
  },
  execute: async (client, interaction, guild) => {
    const member = guild.members.cache.get(interaction.options.getUser("member").id);

    const channel = guild.channels.cache.get(member.voice.channelId);
    if (!channel) return interaction.reply("The member is not in a voice channel!");

    try {
      await member.voice.setDeaf(true);
      interaction.reply("Member successfully muted on voice channel");
    } catch { }
  },

  config: {
    name: "deafen",
    description: "deafens a member in a voice channel",
    guildOnly: true,
    permissions: ["SEND_MESSAGES", "DEAFEN_MEMBERS"]
  }
};

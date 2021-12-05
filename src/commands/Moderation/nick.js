module.exports = {
  run: async (client, message, args) => {
    const member = message.mentions.members.first() ?? message.member;
    const name = args.join(" ").split(member).join(" ");

    await member.setNickname(name);
    message.channel.send(`${member}'s nickname set to ${name}.`);
  },
  slashCommand: {
    options: [
      {
        name: "nickname",
        description: "The nickname to set",
        type: "STRING",
        required: true
      },
      {
        name: "member",
        description: "The member to change to",
        type: "USER",
        required: false
      }
    ]
  },
  execute: async (client, interaction, guild) => {
    const member = guild.members.cache.get(interaction.options.getUser("member")?.id) ?? interaction.member;
    const name = interaction.options.getString("nickname");

    await member.setNickname(name);
    interaction.reply(`${member.user.tag}'s nickname set to ${name}.`);
  },
  config: {
    name: "nick",
    description: "Set a nickname to a member.",
    guildOnly: true,
    permissions: ["SEND_MESSAGES", "CHANGE_NICKNAME", "MANAGE_NICKNAMES"]
  }
};

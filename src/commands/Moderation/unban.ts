export const Command = {
  run: async (client, message, args) => {
    const member = args[0];
    if (!member) return message.channel.send("You didn't specified a member!");
    if (isNaN(member)) return message.channel.send("The user's ID should be specified.");

    message.guild.bans?.fetch().then(bans => {
      const user = bans.find(ban => ban.user.id === member);
      if (!user) return message.channel.send("User not found in bans.");
      message.guild.unban(user.user);
      message.channel.send("user successfully unbanned!");
    });
  },
  slashCommand: {
    options: [
      {
        name: "id",
        description: "The id of the member you want to unban",
        type: "INTEGER",
        required: true
      }
    ]
  },
  execute: async (client, interaction, guild) => {
    const member = interaction.options.getInteger("ID");

    guild.bans?.fetch().then(bans => {
      const user = bans.find(ban => ban.user.id === member);
      if (!user) return interaction.reply("User not found in bans.");
      guild.unban(user.user);
      interaction.reply("user successfully unbanned!");
    });
  },

  config: {
    name: "unban",
    description: "Unbans a banned member in a guild.",
    guildOnly: true,
    permissions: ["SEND_MESSAGES", "BAN_MEMBERS"]
  }
};

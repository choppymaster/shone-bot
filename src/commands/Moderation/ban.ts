import { MessageEmbed } from "discord.js";

export const Command = {
  run: (client, message, args) => {
    const member = message.mentions.members.first();
    if (!member) return message.channel.send(`You didn't specified a member, ${message.author}.`).then(m => m.delete({ timeout: 10000 }));
    const reason = args.slice(1).join(" ") ?? "Reason Not specified";

    member.ban({ reason: reason }).then(() => {
      const embed = new MessageEmbed()
	      .setDescription(`${member.user.tag} was successfully banned. \n Reason: ${reason}`);
      message.channel.send({ embeds: [embed] });
    });
  },
  slashCommand: {
    options: [
      {
        name: "member",
        description: "The member you want to ban",
        type: "USER",
        required: true
      },
      {
        name: "reason",
        description: "The reason to ban this user.",
        type: "STRING",
        required: false
      }
    ]
  },

  execute: async (client, interaction, guild) => {
    const member = guild.members.cache.get(interaction.options.getUser("member").id);
    const reason = interaction.options.getString("reason") ?? "Reason Not specified";

    member.ban({ reason: reason }).then(() => {
      const embed = new MessageEmbed()
	      .setDescription(`${member.user.tag} was successfully banned. \n Reason: ${reason}`);
      interaction.reply({ embeds: [embed] });
    });
  },

  config: {
    name: "ban",
    description: "Bans a member from the server",
    guildOnly: true,
    permissions: ["BAN_MEMBERS", "SEND_MESSAGES"]
  }
};

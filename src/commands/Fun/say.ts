import { MessageEmbed } from "discord.js";

export const Command = {
  run: (client, message, args) => {
    const text = args.join(" ");
    if (!text) return message.channel.send("You didn't specified something to say!");
    const embed = new MessageEmbed()
      .setDescription(text);
    message.channel.send({ embeds: [embed] });
  },
  slashCommand: {
    options: [
      {
        name: "text",
        description: "The thing to say",
        type: "STRING",
        required: true
      }
    ]
  },
  execute: (client, interaction, guild) => {
    const text = interaction.options.getString("text");
    const embed = new MessageEmbed()
      .setDescription(text)
      .setFooter(interaction.member.user.tag);
    interaction.reply({ embeds: [embed] });
  },

  config: {
    name: "say",
    description: "says something you specify",
    permissions: ["SEND_MESSAGES"]
  }
};

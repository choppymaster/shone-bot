const { MessageEmbed } = require("discord.js");

module.exports = {
  run: (client, message, args) => {
    const member = message.mentions.members.first() || message.member;

    const warns = member.warns;
    const embed = new MessageEmbed()
      .setTitle(`Warnings - ${member.user.tag}`)
      .setColor("RANDOM");

    if (warns.length) {
	    for (let i = 0; i < warns.length; i++) {
	        embed.addField(`Warn no. ${i + 1}`, [
	            `Author: ${message.guild.members.cache.get(warns[i].moderator).user.tag ? message.guild.members.cache.get(warns[i].moderator).user.tag : "User left"}`,
	            `Reason: ${warns[i].reason}`,
	            `Date: ${warns[i].date}`].join("\n"), true);
	    }
	    message.channel.send({ embeds: [embed] });
    } else {
	   message.channel.send("They don't have any warns.");
    }
  },
  slashCommand: {
    options: [
      {
        name: "member",
        description: "The member for the warnings list. If not specified gets the warnings of you.",
        type: "USER",
        required: false
      }
    ]
  },
  execute: async (client, interaction, guild) => {
    const member = guild.members.cache.get(interaction.options.getUser("member").id) || interaction.member;

    const warns = member.warns;
    const embed = new MessageEmbed()
      .setTitle(`Warnings - ${member.user.tag}`)
      .setColor("RANDOM");

    if (warns.length) {
	    for (let i = 0; i < warns.length; i++) {
	        embed.addField(`Warn no. ${i + 1}`, [
	            `Author: ${guild.members.cache.get(warns[i].moderator).user.tag ?? "User left"}`,
	            `Reason: ${warns[i].reason}`,
	            `Date: ${warns[i].date}`].join("\n"), true);
	    }
	    interaction.reply({ embeds: [embed] });
    } else {
	  interaction.reply("They don't have any warns.").then(() => setTimeout(() => { interaction.deleteReply(); }, 10000));
    }
  },
  config: {
	  name: "warnings",
	  description: "Get the warnings of a member on the server",
	  guildOnly: true,
	  permissions: ["SEND_MESSAGES"]
  }
};

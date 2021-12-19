import Command from "../../core/Command";
import { name, description, guildOnly, slashCommandOptions, userPermissions, usage } from "../../core/commandDecorators";
import { MessageEmbed } from "discord.js";

@name("warnings")
@description("get the warnings of a member")
@guildOnly
@slashCommandOptions([
  {
    name: "member",
    description: "The member to search warnings for",
    type: "USER",
    required: false
  }
])
@usage("[?member]")
class Warnings extends Command {
  public async run(client, message, args) {
    const member = message.mentions.members.first() || message.member;

    const warns = await member.fetchWarns();
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
  }

  public async execute(client, interaction, guild) {
    const member = guild.members.cache.get(interaction.options.getUser("member").id) || interaction.member;

    const warns = await member.fetchWarns();
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
  }
}

export default Warnings;

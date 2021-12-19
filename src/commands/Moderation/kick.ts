import Command from "../../core/Command";
import { name, description, guildOnly, slashCommandOptions, userPermissions, clientPermissions, usage } from "../../core/commandDecorators";
import { MessageEmbed } from "discord.js";

@name("kick")
@description("Kicks a member from guild")
@guildOnly
@slashCommandOptions([
  {
    name: "member",
    description: "The user to kick",
    type: "USER",
    required: true
  },
  {
    name: "reason",
    description: "The reason for kicking this user",
    type: "STRING",
    required: true
  }
])
@userPermissions("KICK_MEMBERS")
@clientPermissions("KICK_MEMBERS", "EMBED_LINKS")
@usage("[member] [?reason]")
class Kick extends Command {
  public run(client, message, args) {
    const member = message.mentions.members.first();
    if (!member) return message.channel.send("You didn't mentioned a user to kick!").then(m => m.delete({ timeout: 10000 }));
    const reason = args.slice(1).join(" ") ?? "Reason Not specified";
    member.kick({ reason: reason }).then(() => {
      const KickEmbed = new MessageEmbed()
        .setColor("RANDOM")
        .setDescription(`${member} was kicked. \n Reason ${reason}`);
      message.channel.send({ embeds: [KickEmbed] });
    });
  }

  public execute(client, interaction, guild) {
    const member = guild.members.cache.get(interaction.options.getUser("member").id);
    const reason = interaction.options.getString("reason") ?? "Reason Not specified";
    member.kick({ reason: reason }).then(() => {
      const KickEmbed = new MessageEmbed()
        .setColor("RANDOM")
        .setDescription(`${member} was kicked. \n Reason ${reason}`);
      interaction.reply({ embeds: [KickEmbed] });
    });
  }
}

export default Kick;

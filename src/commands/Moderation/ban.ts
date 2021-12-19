import Command from "../../core/Command";
import { name, description, guildOnly, slashCommandOptions, userPermissions, clientPermissions, usage } from "../../core/commandDecorators";
import { MessageEmbed } from "discord.js";

@name("ban")
@description("Bans a member.")
@guildOnly
@slashCommandOptions([
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
])
@userPermissions("BAN_MEMBERS")
@clientPermissions("BAN_MEMBERS", "EMBED_LINKS")
@usage("[member] [?reason]")
class Ban extends Command {
  public run(client, message, args) {
    const member = message.mentions.members.first();
    if (!member) return message.channel.send(`You didn't specified a member, ${message.author}.`).then(m => m.delete({ timeout: 10000 }));
    const reason = args.slice(1).join(" ") ?? "Reason Not specified";

    member.ban({ reason: reason }).then(() => {
      const embed = new MessageEmbed()
	      .setDescription(`${member.user.tag} was successfully banned. \n Reason: ${reason}`);
      message.channel.send({ embeds: [embed] });
    });
  }

  public execute(client, interaction, guild) {
    const member = guild.members.cache.get(interaction.options.getUser("member").id);
    const reason = interaction.options.getString("reason") ?? "Reason Not specified";

    member.ban({ reason: reason }).then(() => {
      const embed = new MessageEmbed()
	      .setDescription(`${member.user.tag} was successfully banned. \n Reason: ${reason}`);
      interaction.reply({ embeds: [embed] });
    });
  }
}

export default Ban;

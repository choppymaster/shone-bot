import Command from "../../core/Command";
import { name, description, guildOnly, slashCommandOptions, clientPermissions, usage, cooldown } from "../../core/commandDecorators";
import { MessageEmbed } from "discord.js";

@name("userinfo")
@description("Get info about user")
@guildOnly
@slashCommandOptions([
  {
    name: "user",
    description: "The user to info",
    type: "USER",
    required: false
  }
])
@clientPermissions("EMBED_LINKS")
@usage("[?member]")
@cooldown(9000)
class Userinfo extends Command {
  public async run(client, message, args) {
    const user = message.mentions.users.first() || message.member.user;
    const member = message.guild.members.cache.get(user.id);
    const embed = new MessageEmbed()
      .setTitle(`User Info - ${user.username}`)
      .setColor("RANDOM")
      .setThumbnail(user.displayAvatarURL({ size: 2048 }))
      .addField("Tag", user.tag.toString(), true)
      .addField("ID", member.user.id.toString(), true)
      .addField("Nickname", member.nickname || "None", true)
      .addField("Presence Status", member.presence?.status, true)
      .addField("Created at", new Date(user.createdTimestamp).toLocaleString(), true)
      .addField("Joined at", new Date(member.joinedTimestamp).toLocaleString(), true);

    message.channel.send({ embeds: [embed] });
  }

  public async execute(client, interaction, guild) {
    const user = interaction.options.getUser("user") || interaction.member.user;
    const member = guild.members.cache.get(user.id);
    const embed = new MessageEmbed()
      .setTitle(`User Info - ${user.username}`)
      .setColor("RANDOM")
      .setThumbnail(user.displayAvatarURL({ size: 2048 }))
      .addField("Tag", user.tag.toString(), true)
      .addField("ID", member.user.id.toString(), true)
      .addField("Nickname", member.nickname || "None", true)
      .addField("Presence Status", member.presence?.status, true)
      .addField("Created at", new Date(user.createdTimestamp).toLocaleString(), true)
      .addField("Joined at", new Date(member.joinedTimestamp).toLocaleString(), true);

    interaction.reply({ embeds: [embed] });
  }
}

export default Userinfo;

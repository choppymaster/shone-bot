import Command from "../../core/Command";
import { name, description, guildOnly, slashCommandOptions, userPermissions, clientPermissions, usage } from "../../core/commandDecorators";

@name("undeafen")
@description("Undeafen a member in VC")
@guildOnly
@slashCommandOptions([
  {
    name: "member",
    description: "The user to undefended",
    type: "USER",
    required: true
  }
])
@userPermissions("DEAFEN_MEMBERS")
@clientPermissions("DEAFEN_MEMBERS")
@usage("[member]")
class Undeafen extends Command {
  public async run(client, message, args) {
    const member = message.mentions.members.first();
    if (!member) return message.channel.send("You didn't mentioned a user to be undeafened?!");

    const channel = member.guild.channels.cache.get(member.voice?.channelId);
    if (!channel) return message.channel.send("The member is not in a voice channel!");

    try {
      await member.voice.setDeaf(false);
      message.channel.send("Member successfully unmuted on voice channel");
    } catch { }
  }

  public async execute(client, interaction, guild) {
    const member = guild.members.cache.get(interaction.options.getUser("member").id);

    const channel = guild.channels.cache.get(member.voice?.channelId);
    if (!channel) return interaction.reply("The member is not in a voice channel!");

    try {
      await member.voice.setDeaf(false);
      interaction.reply("Member successfully unmuted on voice channel");
    } catch { }
  }
}

export default Undeafen;

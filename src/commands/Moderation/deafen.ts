import Command from "../../core/Command";
import { name, description, guildOnly, aliases, slashCommandOptions, userPermissions, clientPermissions, usage } from "../../core/commandDecorators";

@name("deafen")
@description("Deafens a member in voice channel")
@guildOnly
@slashCommandOptions([
  {
    name: "member",
    description: "The member you want to deafen",
    type: "USER",
    required: true
  }
])
@userPermissions("DEAFEN_MEMBERS")
@clientPermissions("DEAFEN_MEMBERS")
@usage("[member]")
class Deafen extends Command {
  public async run(client, message, args) {
    const member = message.mentions.members.first();
    if (!member) return message.channel.send("You didn't mentioned a user to be defended!");

    const channel = member.guild.channels.cache.get(member.voice.channelId);
    if (!channel) return message.channel.send("The member is not in a voice channel!");

    try {
      await member.voice.setDeaf(true);
      message.channel.send("Member successfully muted on voice channel");
    } catch { }
  }

  public async execute(client, interaction, guild) {
    const member = guild.members.cache.get(interaction.options.getUser("member").id);

    const channel = guild.channels.cache.get(member.voice.channelId);
    if (!channel) return interaction.reply("The member is not in a voice channel!");

    try {
      await member.voice.setDeaf(true);
      interaction.reply("Member successfully muted on voice channel");
    } catch {}
  }
}

export default Deafen;

import Command from "../../core/Command";
import { name, description, guildOnly, slashCommandOptions, userPermissions, clientPermissions, usage } from "../../core/commandDecorators";

@name("unmute")
@description("Unmute a muted member")
@guildOnly
@slashCommandOptions([
  {
    name: "member",
    description: "The member you want to unmute",
    type: "USER",
    required: true
  }
])
@userPermissions("MANAGE_ROLES")
@clientPermissions("MANAGE_ROLES")
@usage("[member]")
class Unmute extends Command {
  public async run(client, message, args) {
    const member = message.mentions.members.first();
    if (!member) return message.channel.send("member not specified");

    const data = await message.guild.fetchData();
    const role = message.guild.roles.cache.get(data.muteRole);
    if (!role) return message.channel.send("Member is not muted");

    await member.roles.remove(role);

    message.channel.send(`${member} is unmuted!`);
  }

  public async execute(client, interaction, guild) {
    const member = guild.members.cache.get(interaction.options.getUser("member").id);

    const data = await guild.fetchData();
    const role = guild.roles.cache.get(data.muteRole);
    if (!role) return interaction.reply("Member is not muted");

    await member.roles.remove(role);

    interaction.reply(`${member} is unmuted!`);
  }
}

export default Unmute;

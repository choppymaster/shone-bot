import Command from "../../core/Command";
import { name, description, guildOnly, aliases, slashCommandOptions, userPermissions, clientPermissions, usage } from "../../core/commandDecorators";
import { Schemas } from "../../common";

@name("clearwarn")
@description("Clears all the warns of a member")
@guildOnly
@aliases("clearwarns", "clear-warns")
@slashCommandOptions([
  {
    name: "member",
    description: "The member to clear warns",
    type: "USER",
    required: true
  }
])
@userPermissions("MANAGE_MESSAGES")
@clientPermissions("MANAGE_MESSAGES")
@usage("[member]")
class Clearwarn extends Command {
  public async run(client, message, args) {
    const member = message.mentions.members.first();
    if (!member) return message.channel.send("Member not specified").then(m => m.delete({ timeout: 10000 }));
    if (member.id === message.author.id) return message.channel.send("You cant clear warns yourself").then(m => m.delete({ timeout: 10000 }));
    if (member.id === client.user.id) return message.channel.send("You cant clear-warns me because you cant warn me lol").then(m => m.delete({ timeout: 10000 }));

    const warns = await member.fetchWarns();

    if (!warns.length) return message.channel.send("They don't have any warns!");

    await Schemas.Warn.deleteMany({ userID: member.id, guildID: message.guild.id });
    message.channel.send(`${member.user.tag}'s warnings have been cleared.`);
  }

  public async execute(client, interaction, guild) {
    const member = guild.members.cache.get(interaction.options.getUser("member").id);
    if (member.id === interaction.member.id) return interaction.reply("You cant clear warns yourself").then(() => setTimeout(() => { interaction.deleteReply(); }, 10000));
    if (member.id === client.user.id) return interaction.reply("You cant clear-warns me because you cant warn me lol").then(() => setTimeout(() => { interaction.deleteReply(); }, 10000));

    const warns = await member.fetchWarns();

    if (!warns.length) return interaction.reply("They don't have any warns!").then(() => setTimeout(() => { interaction.deleteReply(); }, 10000));

    await Schemas.Warn.deleteMany({ userID: member.id, guildID: guild.id });
    interaction.reply(`${member.user.tag}'s warnings have been cleared.`);
  }
}

export default Clearwarn;

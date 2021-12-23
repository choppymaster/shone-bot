import Command from "../../core/Command";
import { name, description, guildOnly, slashCommandOptions, userPermissions, usage } from "../../core/commandDecorators";
import { Schemas } from "../../common";

@name("unwarn")
@description("Unwarns a member")
@guildOnly
@slashCommandOptions([
  {
    name: "member",
    description: "The user to unwarn for",
    type: "USER",
    required: true
  }
])
@userPermissions("MANAGE_MESSAGES")
@usage("[member]")
class Unwarn extends Command {
  public async run(client, message, args) {
    const member = message.mentions.members.first();
    if (!member) return message.channel.send("Member not specified");
    if (member.id === message.author?.id) return message.channel.send("You cant unwarn yourself.");
    if (member.id === client.user.id) return message.channel.send("You cant warn me");

    const warns = await member.fetchWarns();

	  if (!warns.length) return message.channel.send("They don't have any warns");

	  await Schemas.Warn.findByIdAndRemove(warns[warns.length - 1]._id);

	  message.channel.send(`${member.user.tag} is unwarned. They have ${warns.length - 1} warns.`);
  }

  public async execute(client, interaction, guild) {
    const member = guild.members.cache.get(interaction.options.getUser("member").id);
    if (member.id === interaction.member?.id) return interaction.reply("You cant unwarn yourself.");
    if (member.id === client.user.id) return interaction.reply("You cant warn me");

    const warns = await member.fetchWarns();

	  if (!warns.length) return interaction.reply("They don't have any warns");

	  await Schemas.Warn.findByIdAndRemove(warns[warns.length - 1]._id);

	  interaction.reply(`${member.user.tag} is unwarned. They have ${warns.length - 1} warns.`);
  }
}

export default Unwarn;

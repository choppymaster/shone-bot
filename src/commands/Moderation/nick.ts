import Command from "../../core/Command";
import { name, description, guildOnly, slashCommandOptions, userPermissions, clientPermissions, usage } from "../../core/commandDecorators";
import { Permissions } from "discord.js";

@name("nick")
@description("Set a nickname to a member, or you.")
@guildOnly
@slashCommandOptions([
  {
    name: "nickname",
    description: "The nickname to set",
    type: "STRING",
    required: true
  },
  {
    name: "member",
    description: "The member to change to",
    type: "USER",
    required: false
  }
])
@userPermissions("CHANGE_NICKNAME")
@clientPermissions("MANAGE_NICKNAMES")
@usage("[nickname] [?member]")
class Nick extends Command {
  public async run(client, message, args) {
    const member = (message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES) ? message.mentions.members.first() : null) ?? message.member;
    const name = args.join(" ").split(member).join(" ");

    await member.setNickname(name);
    message.channel.send(`${member}'s nickname set to ${name}.`);
  }

  public async execute(client, interaction, guild) {
    const member = (interaction.member.permissions.has(Permissions.FLAGS.MANAGE_NICKNAMES) ? guild.members.cache.get(interaction.options.getUser("member")?.id) : null) ?? interaction.member;
    const name = interaction.options.getString("nickname");

    await member.setNickname(name);
    interaction.reply(`${member.user.tag}'s nickname set to ${name}.`);
  }
}

export default Nick;

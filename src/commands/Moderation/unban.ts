import Command from "../../core/Command";
import { name, description, guildOnly, slashCommandOptions, userPermissions, clientPermissions, usage } from "../../core/commandDecorators";

@name("unban")
@description("Unbans a banned member.")
@guildOnly
@slashCommandOptions([
  {
    name: "id",
    description: "The id of the user",
    type: "INTEGER",
    required: true
  }
])
@userPermissions("BAN_MEMBERS")
@clientPermissions("BAN_MEMBERS")
@usage("[id]")
class Unban extends Command {
  public async run(client, message, args) {
    const member = args[0];
    if (!member) return message.channel.send("You didn't specified a member!");
    if (isNaN(member)) return message.channel.send("The user's ID should be specified.");

    message.guild.bans?.fetch().then(bans => {
      const user = bans.find(ban => ban.user.id === member);
      if (!user) return message.channel.send("User not found in bans.");
      message.guild.unban(user.user);
      message.channel.send("user successfully unbanned!");
    });
  }

  async execute(client, interaction, guild) {
    const member = interaction.options.getInteger("ID");

    guild.bans?.fetch().then(bans => {
      const user = bans.find(ban => ban.user.id === member);
      if (!user) return interaction.reply("User not found in bans.");
      guild.unban(user.user);
      interaction.reply("user successfully unbanned!");
    });
  }
}

export default Unban;

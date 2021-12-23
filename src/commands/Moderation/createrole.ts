import Command from "../../core/Command";
import { name, description, guildOnly, aliases, slashCommandOptions, userPermissions, clientPermissions, usage } from "../../core/commandDecorators";

@name("createrole")
@description("Creates a role.")
@guildOnly
@aliases("create-role")
@slashCommandOptions([
  {
    name: "name",
    description: "The name of the role to create",
    type: "STRING",
    required: true
  }
])
@userPermissions("MANAGE_ROLES")
@clientPermissions("MANAGE_ROLES")
@usage("[name]")
class Createrole extends Command {
  public async run(client, message, args) {
    const name = args.join(" ");

    await message.guild.roles.create({ name: name });
    message.channel.send(`Role ${name} created.`);
  }

  public async execute(client, interaction, guild) {
    const name = interaction.options.getString("name");

    await guild.roles.create({ name: name });
    interaction.reply(`Role ${name} created.`);
  }
}

export default Createrole;

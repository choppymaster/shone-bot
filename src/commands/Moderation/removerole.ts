import Command from "../../core/Command";
import { name, description, guildOnly, slashCommandOptions, userPermissions, clientPermissions, usage } from "../../core/commandDecorators";

@name("removerole")
@description("removes a role from member")
@guildOnly
@slashCommandOptions([
  {
    name: "member",
    description: "The member to remove roles",
    type: "USER",
    required: true
  },
  {
    name: "role",
    description: "The role to remove",
    type: "ROLE",
    required: true
  }
])
@userPermissions("MANAGE_ROLES")
@clientPermissions("MANAGE_ROLES")
@usage("[member] [role]")
class Removerole extends Command {
  public async run(client, message, args) {
    const role = message.mentions.roles.first();
    const member = message.mentions.members.first();

    if (!role) return message.channel.send("Role not specified");
    if (!member) return message.channel.send("Member not specified");

    await member.roles.remove(role);
    message.channel.send(`Role ${role.name} removed from ${member}.`);
  }

  public async execute(client, interaction, guild) {
    const role = interaction.options.getRole("role");
    const member = guild.members.cache.get(interaction.options.getUser("member").id);

    await member.roles.remove(role);
    interaction.reply(`Role ${role.name} removed from ${member}.`);
  }
}

export default Removerole;

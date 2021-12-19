import Command from "../../core/Command";
import { name, description, guildOnly, cooldown, slashCommandOptions, userPermissions, clientPermissions, usage } from "../../core/commandDecorators";

@name("addrole")
@description("Adds a role to a member.")
@guildOnly
@cooldown(8000)
@slashCommandOptions([
  {
    name: "member",
    description: "The member to add roles too",
    type: "USER",
    required: true
  },
  {
    name: "role",
    description: "The role to add",
    type: "ROLE",
    required: true
  }
])
@userPermissions("MANAGE_ROLES")
@clientPermissions("MANAGE_ROLES")
@usage("[member] [role]")
class Addrole extends Command {
  public async run(client, message, args) {
    const role = message.mentions.roles.first();
    const member = message.mentions.members.first();

    if (!role) return message.channel.send("Role not specified");
    if (!member) return message.channel.send("Member not specified");

    await member.roles.add(role);
    message.channel.send(`Role ${role.name} added to ${member}.`);
  }

  async execute(client, interaction, guild) {
    const role = interaction.options.getRole("role");
    const member = guild.members.cache.get(interaction.options.getUser("member").id);

    await member.roles.add(role);
    interaction.reply(`Role ${role.name} added to ${member}.`);
  }
}

export default Addrole;

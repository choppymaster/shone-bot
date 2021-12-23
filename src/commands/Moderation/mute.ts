import Command from "../../core/Command";
import { name, description, guildOnly, slashCommandOptions, userPermissions, clientPermissions, usage } from "../../core/commandDecorators";

@name("mute")
@description("Mutes a member")
@guildOnly
@slashCommandOptions([
  {
    name: "member",
    description: "the member to mute",
    type: "USER",
    required: true
  }
])
@userPermissions("MANAGE_ROLES")
@clientPermissions("MANAGE_ROLES")
@usage("[member] [?reason]")
class Mute extends Command {
  public async run(client, message, args) {
    const member = message.mentions.users.first();
    if (!member) return message.channel.send("Member not specified");

    const data = await message.guild.fetchData();

    if (!message.guild.roles.cache.get(data.muteRole)) {
      message.guild.roles.create({
        name: `Muted by ${client.user.username}`,
        permissions: ["READ_MESSAGE_HISTORY"]
      }).then(role => {
        message.guild.updateGuildData({ muteRole: role.id });

        message.guild.channels.cache.forEach(channel => {
          channel.permissionOverwrites.create(role, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false,
            SPEAK: false,
            USE_APPLICATION_COMMANDS: false
          }, { reason: "Mute role overwrites", type: 0 });
        });
      });
    }
    const role = message.guild.roles.cache.get(data.muteRole);
    await message.guild.members.cache.get(member.id).roles.add(role);
    message.channel.send(`${member} is muted`);
  }

  public async execute(client, interaction, guild) {
    const member = interaction.options.getUser("member");

    const data = await guild.fetchData();

    if (!guild.roles.cache.get(data.muteRole)) {
      guild.roles.create({
        name: `Muted by ${client.user.username}`,
        permissions: ["READ_MESSAGE_HISTORY"]
      }).then(role => {
        guild.updateGuildData({ muteRole: role.id });

        guild.channels.cache.forEach(channel => {
          channel.permissionOverwrites.create(role, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false,
            SPEAK: false,
            USE_APPLICATION_COMMANDS: false
          }, { reason: "Mute role overwrites", type: 0 });
        });
      });
    }
    const role = guild.roles.cache.get(data.muteRole);
    await guild.members.cache.get(member.id).roles.add(role);
    interaction.reply(`${member} is muted`);
  }
}

export default Mute;

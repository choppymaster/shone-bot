module.exports = {
  run: async (client, message, args) => {
    const role = message.mentions.roles.first();
    const member = message.mentions.members.first();

    if (!role) return message.channel.send("Role not specified");
    if (!member) return message.channel.send("Member not specified");

    await member.roles.add(role);
    message.channel.send(`Role ${role.name} added to ${member}.`);
  },
  slashCommand: {
    options: [
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
    ]
  },
  execute: async (client, interaction, guild) => {
    const role = interaction.options.getRole("role");
    const member = guild.members.cache.get(interaction.options.getUser("member").id);

    await member.roles.add(role);
    interaction.reply(`Role ${role.name} added to ${member}.`);
  },
  config: {
    name: "addrole",
    description: "adds a role to a member.",
    guildOnly: true,
    permissions: ["SEND_MESSAGES", "MANAGE_ROLES"]
  }
};

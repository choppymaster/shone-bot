export const Command = {
  run: async (client, message, args) => {
    const name = args.join(" ");

    await message.guild.roles.create({ name: name });
    message.channel.send(`Role ${name} created.`);
  },
  slashCommand: {
    options: [
      {
        name: "name",
        description: "The name of the role to create",
        type: "STRING",
        required: true
      }
    ]
  },
  execute: async (client, interaction, guild) => {
    const name = interaction.options.getString("name");

    await guild.roles.create({ name: name });
    interaction.reply(`Role ${name} created.`);
  },
  config: {
    name: "createrole",
    description: "creates a role.",
    guildOnly: true,
    permissions: ["SEND_MESSAGES", "MANAGE_ROLES"]
  }
};

const { Schemas } = require("../../common");

module.exports = {
	run: async (client, message, args) => {
		const member = message.mentions.members.first();
		if (!member) return message.channel.send("Member not specified").then(m => m.delete({ timeout: 10000 }));
		if (member.id === message.author.id) return message.channel.send("You cant clear warns yourself").then(m => m.delete({ timeout: 10000 }));
		if (member.id === client.user.id) return message.channel.send("You cant clear-warns me because you cant warn me lol").then(m => m.delete({ timeout: 10000 }));

		const obj = { userID: member.id, guildID: message.guild.id };

		const warns = await Schemas.warns.find(obj);

		if (!warns.length) return message.channel.send("They don't have any warns!");

		await Schemas.warns.deleteMany(obj);
		await member.fetchWarns();
		message.channel.send(`${member.user.tag}'s warnings have been cleared.`);
	},
	slashCommand: {
		options:[
			{
				name: "member",
				description: "The member to clear warns for",
				type: "USER",
				required: true,
			},
		],
	},
	execute: async (client, interaction, guild) => {
		const member = guild.membrs.cache.get(interaction.options.getUser("member").id);
		if (member.id === interaction.member.id) return interaction.reply("You cant clear warns yourself").then(() => setTimeout(() => { interaction.deleteReply }, 10000));
		if (member.id === client.user.id) return interaction.reply("You cant clear-warns me because you cant warn me lol").then(() => setTimeout(() => { interaction.deleteReply }, 10000));

		const obj = { userID: member.id, guildID: guild.id };

		const warns = await Schemas.warns.find(obj);

		if (!warns.length) return interaction.reply("They don't have any warns!").then(() => setTimeout(() => { interaction.deleteReply }, 10000));

		await Schemas.warns.deleteMany(obj);
		await member.fetchWarns();
		interaction.reply(`${member.user.tag}'s warnings have been cleared.`);
	},

	config: {
		name: "clearwarn",
		description: "clear all the warns of a warned member",
		guildOnly: true,
		permissions: ["MANAGE_MESSAGES", "SEND_MESSAGES"],
	},
};
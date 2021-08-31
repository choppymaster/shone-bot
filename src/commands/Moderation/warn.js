const { Schemas } = require("../../common");
const { MessageEmbed } = require("discord.js");

module.exports.run = (client, message, args) => {
	const member = message.mentions.members.first();
	if (!member) return message.channel.send("Member not specified");
	if (member.id === message.author?.id) return message.channel.send("You cant warn yourself").then(m => m.delete({ timeout: 10000 }));
	if (member.id === client.user.id) return message.channel.send("You cant warn me").then(m => m.delete({ timeout: 10000 }));
	const reason = args.slice(1).join(" ") ? args.slice(1).join(" ") : "No reason specified";

	Schemas.warns.find({
	    userID: member.id,
	    guildID: message.guild.id,
	}, async (err, warns) => {
        if (err) client.logger.error(err)
        if (warns.length === 4) return message.channel.send("Sorry, The user have exceeded his maximum warn length.");
		const newWarn = new Schemas.warns({
	    userID: member.id,
	    guildID: message.guild.id,
	    reason: reason,
	    moderator: message.author.id,
	    date: new Date().toUTCString(),
		});

		await newWarn.save().catch(() => client.logger.error(e.stack));

		await member.fetchWarns();

		const embed = new MessageEmbed()
			.setColor("RANDOM")
			.setDescription([
	    `**${member.user.tag} is warned**`,
	    `Reason: ${reason}`,
	    ].join("\n\n"));
	    message.channel.send({ embeds: [embed] });
	});
};

module.exports.config = {
	"name": "warn",
	"description": "Warns a member on the server",
	"guildOnly": true,
	"permissions": ["MANAGE_MESSAGES", "SEND_MESSAGES"],
};
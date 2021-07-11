const srod = require("something-random-on-discord");

module.exports.run = async (client, message, args) => {
	const pkg = args.join(" ");
	if (!pkg) return message.channel.send("You didn't specified a package!");

	let info;
	try {
	   info = await srod.Random.getNPM(pkg);
	}
	catch {
	        info = "package not found";
	}
	message.channel.send(info);
};

module.exports.config = {
	"name": "npm",
	"description": "searchs about a npm package.",
	"permissions": ["SEND_MESSAGES"],
};
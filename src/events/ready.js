module.exports.run = client => {
	client.logger.info("I am ready to go.");
	client.user.setPresence({ activity: { name: "Super Mario Bros 2", type: "PLAYING" }, status: "idle" });

};

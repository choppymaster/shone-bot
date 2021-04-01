const { model, Schema } = require("mongoose");

const warnSchema = Schema({
	userID: String,
	guildID: String,
	warns: Number,
	reason: Array,
	moderators: Array,
	date: Array,
});

module.exports = model("warns", warnSchema);
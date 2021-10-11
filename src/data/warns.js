const { model, Schema } = require("mongoose");

const warnSchema = Schema({
  userID: String,
  guildID: String,
  reason: String,
  moderator: String,
  date: String
});

module.exports = model("warns", warnSchema);

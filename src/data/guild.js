const { Schema, model } = require("mongoose");

const guildSchema = Schema({
  id: String,
  muteRole: String
});

module.exports = model("guild", guildSchema);

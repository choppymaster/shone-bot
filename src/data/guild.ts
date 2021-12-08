import { Schema, model } from "mongoose";

const guildSchema = Schema({
  id: String,
  muteRole: String
});

export = model("guild", guildSchema);

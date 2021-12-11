import { Schema, model } from "mongoose";

const guildSchema = new Schema({
  id: String,
  muteRole: String
});

export = model("guild", guildSchema);

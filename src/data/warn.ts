import { model, Schema } from "mongoose";

const warnSchema = new Schema({
  userID: String,
  guildID: String,
  reason: String,
  moderator: String,
  date: String
});

export = model("warn", warnSchema);

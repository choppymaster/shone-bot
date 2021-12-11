// import dependencies
import { loadExtends, IEvent } from "./common";
import fs = require("fs")
import client from "./client";

require("dotenv/config");
loadExtends();

// Command handling
(function loadCommands() {
  fs.readdirSync("./src/commands/").forEach(dir => {
    const commandfiles = fs.readdirSync(`./src/commands/${dir}`).filter(file => file.endsWith(".ts"));
    for (const file of commandfiles) {
      const { Command } = require(`./commands/${dir}/${file}`);
      client.loadApplicationCommand(Command);
      client.commands.set(Command.config?.name?.toLowerCase(), Command);
    }
  });
}());

// event handling
const eventFiles = fs.readdirSync("./src/events/").filter(file => file.endsWith(".ts"));

(async function loadEvents() {
  for (const file of eventFiles) {
    const eventName = file.split(".")[0];
    const { Event }: IEvent = require(`./events/${eventName}`);
    client.on(eventName, (...args: any[]) => Event(client, ...args));
  }
}());

// import the token!
client.login(client.config.token);

process.on("unhandledRejection", (err: any) => {
  client.logger.error(err.stack);
});

process.on("uncaughtException", (err: any) => {
  client.logger.error(err.stack);
});

// import dependencies
import { loadExtends } from "./common";
import { IEvent } from "./core/interfaces";
import fs = require("fs")
import client from "./core/client";

require("dotenv/config");

loadExtends();

// Command handling
(function loadCommands() {
  fs.readdirSync("./src/commands/").forEach(dir => {
    const commandfiles = fs.readdirSync(`./src/commands/${dir}`);
    for (const file of commandfiles) {
      const { default: Command } = require(`./commands/${dir}/${file}`);
      const cmd = new Command();
      client.commands.set(cmd.name, cmd);
      if (cmd.aliases) {
        cmd.aliases.forEach(alias => {
          client.aliases.set(alias, cmd);
        });
      }
      client.loadApplicationCommand(cmd);
    }
  });
}());

// event handling
const eventFiles = fs.readdirSync("./src/events/");

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

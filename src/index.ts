// import dependencies
import { loadExtends, IEvent, ICommand } from "./common";
import fs = require("fs")

require("dotenv/config");
loadExtends();
const Client = require("./client");
const client = new Client();

// Command handling
(function loadCommands() {
  fs.readdirSync("./src/commands/").forEach(dir => {
    const commandfiles = fs.readdirSync(`./src/commands/${dir}`).filter(file => file.endsWith(".js"));
    for (const file of commandfiles) {
      const command: ICommand = require(`./commands/${dir}/${file}`);
      client.loadApplicationCommand(command);
      client.commands.set(command.config?.name?.toLowerCase(), command);
    }
  });
}());

// event handling
const eventFiles = fs.readdirSync("./src/events/").filter(file => file.endsWith(".js"));

(function loadEvents() {
  for (const file of eventFiles) {
    const { Event }: IEvent = require(`./events/${file}`);
    const eventName = file.split(".")[0];
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

require("dotenv/config")

// import dependencies
require("./common").loadExtends();
const client = require("./client")
import fs = require("fs");

// Command handling
(function loadCommands() {
  fs.readdirSync("./src/commands/").forEach(dir => {
    const commandfiles = fs.readdirSync(`./src/commands/${dir}`).filter(file => file.endsWith(".js"));
    for (const file of commandfiles) {
      const command = require(`./commands/${dir}/${file}`);
      client.loadApplicationCommand(command);
      client.commands.set(command.config?.name?.toLowerCase(), command);
    }
  });
}());

// event handling
const eventFiles = fs.readdirSync("./src/events/").filter(file => file.endsWith(".js"));

(function loadEvents() {
  for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    const eventName = file.split(".")[0];
    client.on(eventName, (...args: any[]) => event.run(client, ...args));
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
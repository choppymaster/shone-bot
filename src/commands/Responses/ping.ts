import Command from "../../core/Command";
import { name, description, cooldown } from "../../core/commandDecorators";

@name("ping")
@description("says the ping")
@cooldown(10000)
class Ping extends Command {
  public async run(client, message, args) {
    message.channel.send(`Pong! - ${client.ws.ping}`);
  }

  public async execute(client, interaction, guild) {
    interaction.reply(`Pong! - ${client.ws.ping}`);
  }
}

export default Ping;

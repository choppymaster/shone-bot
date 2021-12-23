import Command from "../../core/Command";
import { name, description, ownerOnly } from "../../core/commandDecorators";

@name("shutdown")
@description("Shutdowns the bot")
@ownerOnly
class Shutdown extends Command {
  public async run(client, message, args) {
    await message.channel.send("Goodbye 👋");
    await client.logger.debug("Shutdown.");
    await client.destroy();
    process.exit();
  }

  public async execute(client, interaction, guild) {
    await interaction.reply("Goodbye 👋");
    await client.logger.debug("shutdown.");
    await client.destroy();
    process.exit();
  }
}

export default Shutdown;

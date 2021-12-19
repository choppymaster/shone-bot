import Command from "../../core/Command";
import { name, description, aliases, slashCommandOptions, usage, clientPermissions, cooldown } from "../../core/commandDecorators";
import { MessageEmbed } from "discord.js";

@name("say")
@description("Repeats the text given")
@aliases("repeat")
@slashCommandOptions([
  {
    name: "text",
    description: "The thing to say",
    type: "STRING",
    required: true
  }
])
@usage("[text]")
@clientPermissions("EMBED_LINKS")
@cooldown(30000)
class Say extends Command {
  public run(client, message, args) {
    const text = args.join(" ");
    if (!text) return message.channel.send("You didn't specified something to say!");
    const embed = new MessageEmbed()
      .setDescription(text);
    message.channel.send({ embeds: [embed] });
  }

  public execute(client, interaction, guild) {
    const text = interaction.options.getString("text");
    const embed = new MessageEmbed()
      .setDescription(text)
      .setFooter(interaction.member.user.tag);
    interaction.reply({ embeds: [embed] });
  }
}

export default Say;

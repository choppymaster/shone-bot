export default abstract class Command {
  public name!: string
  public decsription!: string
  public aliases!: string[]
  public guildOnly!: boolean

  public abstract run(client, message, args): any;

  public abstract execute(client, interaction, guild): any;
}

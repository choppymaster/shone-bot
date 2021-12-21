import { ISlashOption } from "./interfaces";

export default abstract class Command {
  public name!: string
  public decsription!: string
  public aliases!: string[]
  public cooldown!: number
  public guildOnly!: boolean
  public ownerOnly!: boolean
  public slashCommandOptions!: ISlashOption[]
  public userPermissions!: string[]
  public clientPermissions!: string[]
  public usage!: string

  public abstract run(client, message, args): any;

  public abstract execute(client, interaction, guild): any;
}

import fs = require("fs")

// database schemas
export const Schemas = {
  Warn: require("./data/warn"),
  Guild: require("./data/guild")
};

// extends
export const loadExtends = () => {
  fs.readdirSync("./src/extends").forEach(file => {
    require(`./extends/${file}`);
  });
};
// command Interface
export interface ICommand {
  run: (client, message, args: string[]) => void | Promise<void>
  slashCommand?: {
    readonly options: Array<{ name: string, description?: string, type: string, required: boolean }>
  }
  execute: (client, interaction, guild) => void | Promise<void>
  readonly config: {
    readonly name: string,
    readonly description?: string,
    readonly botMaster?: boolean,
    readonly guildOnly?: boolean,
    readonly permissions?: Array<{ user: string[], bot: string[] }>
  }
}
// event interface
export interface IEvent {
  Event: (client, ...args: any[]) => void | Promise<void>
}

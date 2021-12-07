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

export interface ICommand {
  run: (client: any, message: any, args: string[]) => void | Promise<void>
  slashCommand?: {
    options: Array<{ name: string, description?: string, type: string, required: boolean }> 
  }
  execute: (client: any, interaction: any, guild: any) => void | Promise<void>
  config: {
    name: string,
    description?: string,
    botMaster?: boolean,
    guildOnly?: boolean,
    permissions?: Array<{ user: string[], bot: string[] }>
  }
}

export interface IEvent {
  run: (client: any, ...args: any[]) => void | Promise<void>
}

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

const fs = require("fs")

// database schemas
module.exports.Schemas = {
  Warn: require("./data/warn")
};

// extends
module.exports.loadExtends = () => {
  fs.readdirSync("./src/extends").forEach(file => {
    require(`./extends/${file}`);
  });
};

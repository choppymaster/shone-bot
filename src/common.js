const fs = require("fs")

// database schemas
module.exports.Schemas = {
  warns: require("./data/warns")
};

// extends
module.exports.loadExtends = () => {
  fs.readdirSync("./src/extends").forEach(file => {
    require(`./extends/${file}`);
  });
};

// database schemas
module.exports.Schemas = {
  warns: require("./data/warns")
};

// extends
module.exports.loadExtends = () => {
  return {
    Member: require("./extends/Member"),
    TextChannel: require("./extends/TextChannel"),
    Message: require("./extends/Message"),
    Guild: require("./extends/Guild")
  };
};

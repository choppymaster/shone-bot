const { Client, Collection } = require("discord.js")

module.exports = class extends Client {
    constructor() {
             super();
        this.config = require("./config.js")
        
        this.logger = require("./utils/logger.js")
        
        this.commands = new Collection()
        
    }
    
}
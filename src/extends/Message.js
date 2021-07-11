const { Structures } = require("discord.js")

module.exports = Structures.extend("Message", msg => {
    class MessageStructure extends msg {
        constructor() {
            super();
            
            this.logged = false;
        }
    }
    return MessageStructure;
})
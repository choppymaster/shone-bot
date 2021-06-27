const { Structures } = require("discord.js")

module.exports = Structures.extend("TextChannel", Channel => {
        class ChannelStructure extends Channel {
                async send(msg) {
                        if (this.guild && this.permissionsFor(this.client.user).has("SEND_MESSAGES") === false) return;
                        return await super.send(msg);
                }
        }
        return ChannelStructure;
})
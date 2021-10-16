const { Message } = require("discord.js");

module.exports = Object.defineProperties(Message.prototype, {
  delete: {
    value: function(timeout = {}) {
      if (timeout.timeout) {
        try {
          setTimeout(() => { this.delete(); }, timeout.timeout);
        } catch (e) {
          this.client.logger.error(e);
        }
      } else {
        try {
          this.delete();
        } catch { 
        	}
    }
  }
});

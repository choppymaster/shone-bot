import { Message } from "discord.js";

export = Object.defineProperties(Message.prototype, {
  delete: {
    value: function(timeout: { timeout: number }) {
      if (timeout.timeout) {
        try {
          setTimeout(() => { this.delete(); }, timeout.timeout);
        } catch (e) {
          this.client.logger.error(e);
        }
      } else {
        try {
          this.delete();
        } catch {}
      }
    }
  }
});

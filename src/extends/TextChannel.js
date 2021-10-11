const { TextChannel, Permissions } = require("discord.js");

const originalSend = TextChannel.prototype.send;

TextChannel.prototype.send = async function(content) {
  const send = originalSend.bind(this);
  if (this.permissionsFor(this.client.user).has(Permissions.FLAGS.SEND_MESSAGES) === false) return;
  return await send(content);
};

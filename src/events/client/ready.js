const { ActivityType } = require("discord.js");
const { login } = require("../../connection.js");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log("[TekTracker] Bot ready!");
    client.user.setActivity("intra.epitech.eu", {
      type: ActivityType.Watching,
    });
    client.user.setStatus("idle");
    login();
  },
};

const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("ping").setDescription("Pong!"),

  async execute(interaction, client) {
    const message = await interaction.deferReply({ fetchReply: true });
    await interaction.editReply(
      `Pong! Latency is ${
        message.createdTimestamp - interaction.createdTimestamp
      }ms. API Latency is ${Math.round(client.ws.ping)}ms`
    );
  },
};

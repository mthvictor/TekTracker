const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Show the help menu"),

  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setTitle(`:information_source: Help Menu`)
      .setColor("#0081be")
      .setTimestamp(Date.now())
      .setFooter({
        text: "TekTracker",
        iconURL: client.user.displayAvatarURL(),
      })
      .addFields([
        {
          name: "Profile",
          value: "Display your EPITECH profile",
          inline: true,
        },
        {
          name: "Activities",
          value: "Display activities you are registered to",
          inline: true,
        },
        {
          name: "Projects",
          value: "Display projects you are registered to",
          inline: true,
        },
        {
          name: "Binomes",
          value: "Display your binomes",
          inline: true,
        },
        {
          name: "Messages",
          value: "Display your new messages",
          inline: true,
        },
        {
          name: "Ping",
          value: "Display the bot's latency",
          inline: true,
        },
      ]);
    await interaction.reply({ embeds: [embed] });
  },
};

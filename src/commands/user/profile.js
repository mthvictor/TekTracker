const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { userData } = require("../../connection.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("profile")
    .setDescription("Display your EPITECH profile"),
  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setTitle(`<:epitech:1073282914210553856> ${userData.title}`)
      .setDescription(
        `**Mail:** ${userData.login}
        **Promo:** ${userData.promo} (Semester ${userData.semester})
        **GPA:** ${userData.gpa[0].gpa}
        **Credits:** ${userData.credits}
        **Time Active:** ${userData.nsstat.active}
        **Time Off:** ${(40 - userData.nsstat.active).toFixed(1)}`
      )
      .setColor("#0081be")
      .setTimestamp(Date.now())
      .setThumbnail("attachment://picture.jpg")
      .setFooter({
        text: "TekTracker",
        iconURL: client.user.displayAvatarURL(),
      });
    await interaction.reply({ embeds: [embed], files: ["./src/assets/picture.jpg"] });
  },
};

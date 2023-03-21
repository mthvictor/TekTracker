const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const axios = require("axios");
const { userData } = require("../../connection");
const { user } = process.env;
var userBinomes = {};
var binomesNB = {};

async function getFlags() {
  await axios
    .request({
      url: `https://intra.epitech.eu/user/${userData.login}/binome?format=json`,
      method: "GET",
      headers: {
        Cookie: `user=${user};`,
      },
    })
    .then((response) => {
      for (const key in response.data.binomes) {
        userBinomes[key] = response.data.binomes[key].login.split("@")[0];
        binomesNB[key] = response.data.binomes[key].nb_activities;
      }
    })
    .catch((error) => {
      console.error(`! [TekTracker] Error while retrieving binomes (${error})`);
    });
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("binomes")
    .setDescription("Display your binomes"),
  async execute(interaction, client) {
    await getFlags();
    const embed = new EmbedBuilder()
      .setTitle(`<:binomes:1073282912344080405> Your Binomes`)
      .setColor("#0081be")
      .setTimestamp(Date.now())
      .setFooter({
        text: "TekTracker",
        iconURL: client.user.displayAvatarURL(),
      });
    for (const key in userBinomes) {
      if (binomesNB[key] == 1) {
        embed.addFields({
          name: userBinomes[key],
          value: `${binomesNB[key]} activity`,
          inline: true,
        });
      } else {
        embed.addFields({
          name: userBinomes[key],
          value: `${binomesNB[key]} activities`,
          inline: true,
        });
      }
    }
    await interaction.reply({ embeds: [embed] });
  },
};

const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const axios = require("axios");
const { user } = process.env;
var userActivities = {};
var activitiesURL = {};
var activitiesEnd = {};

async function getActivities() {
  const start = new Date().toISOString().split("T")[0];
  const end = new Date(new Date().getFullYear(), 11, 31)
    .toISOString()
    .split("T")[0];
  await axios
    .request({
      url: `https://intra.epitech.eu/module/board/?format=json&start=${start}&end=${end}`,
      method: "GET",
      headers: {
        Cookie: `user=${user};`,
      },
    })
    .then((response) => {
      for (const key in response.data) {
        if (response.data[key].registered == 1) {
          userActivities[key] = response.data[key].acti_title;
          activitiesURL[key] =
            response.data[key].scolaryear +
            "/" +
            response.data[key].codemodule +
            "/" +
            response.data[key].codeinstance +
            "/" +
            response.data[key].codeacti;
          activitiesEnd[key] = response.data[key].end_acti
            .split(" ")[0]
            .split("-")
            .reverse()
            .join("/");
        }
      }
    })
    .catch((error) => {
      console.error(
        `! [TekTracker] Error while retrieving activities (${error})`
      );
    });
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("activities")
    .setDescription("Display activities you are registered to"),
  async execute(interaction, client) {
    await getActivities();
    const embed = new EmbedBuilder()
      .setTitle(`<:activities:1073282909538091159> Your Activities`)
      .setColor("#0081be")
      .setTimestamp(Date.now())
      .setFooter({
        text: "TekTracker",
        iconURL: client.user.displayAvatarURL(),
      });
    for (const key in userActivities) {
      embed.addFields({
        name: `${userActivities[key]} (${activitiesEnd[key]})`,
        value: `https://intra.epitech.eu/module/${activitiesURL[key]}/`,
      });
    }
    await interaction.reply({ embeds: [embed] });
  },
};

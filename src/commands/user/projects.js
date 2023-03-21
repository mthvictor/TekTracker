const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const axios = require("axios");
const { user } = process.env;
var userProjects = {};
var projectsURL = {};
var projectsEnd = {};

async function getProjects() {
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
        if (
          response.data != null &&
          response.data[key].type_acti_code == "proj" &&
          response.data[key].registered == 1 &&
          response.data[key].project != null
        ) {
          userProjects[key] = response.data[key].project.split(" : ")[1];
          projectsURL[key] =
            response.data[key].scolaryear +
            "/" +
            response.data[key].codemodule +
            "/" +
            response.data[key].codeinstance +
            "/" +
            response.data[key].codeacti +
            "/project";
          projectsEnd[key] = response.data[key].end_acti
            .split(" ")[0]
            .split("-")
            .reverse()
            .join("/");
        }
      }
    })
    .catch((error) => {
      console.error(
        `! [TekTracker] Error while retrieving projects (${error})`
      );
    });
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("projects")
    .setDescription("Display projects you are registered to"),
  async execute(interaction, client) {
    await getProjects();
    const embed = new EmbedBuilder()
      .setTitle(`<:projects:1073282917427597433> Your Projects`)
      .setColor("#0081be")
      .setTimestamp(Date.now())
      .setFooter({
        text: "TekTracker",
        iconURL: client.user.displayAvatarURL(),
      });
    if (Object.keys(userProjects).length == 0) {
      embed.setDescription("You are not registered to any project");
    }
    for (const key in userProjects) {
      embed.addFields({
        name: `${userProjects[key]} (${projectsEnd[key]})`,
        value: `https://intra.epitech.eu/module/${projectsURL[key]}/`,
      });
    }
    await interaction.reply({ embeds: [embed] });
  },
};

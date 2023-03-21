const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const axios = require("axios");
const { user } = process.env;
var messages = {};
var content = {};

async function getMessages() {
  await axios
    .request({
      url: `https://intra.epitech.eu/#notices`,
      method: "GET",
      headers: {
        Cookie: `user=${user};`,
      },
    })
    .then((response) => {
      for (let i = 0; i < 5; i++) {
        messages[i] = response.data.history[i].title.replace(/<[^>]*>?/gm, "");
        content[i] = response.data.history[i].content
          .replace(/<[^>]*>?/gm, "")
          .split(".")[0];
      }
    })
    .catch((error) => {
      console.error(
        `! [TekTracker] Error while retrieving messages (${error})`
      );
    });
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("messages")
    .setDescription("Display your new messages"),
  async execute(interaction, client) {
    await getMessages();
    const embed = new EmbedBuilder()
      .setTitle(`<:messages:1073282916240593047> Your Messages`)
      .setColor("#0081be")
      .setTimestamp(Date.now())
      .setFooter({
        text: "TekTracker",
        iconURL: client.user.displayAvatarURL(),
      });
    for (const key in messages) {
      embed.addFields({
        name: messages[key],
        value: content[key],
      });
    }
    await interaction.reply({ embeds: [embed] });
  },
};

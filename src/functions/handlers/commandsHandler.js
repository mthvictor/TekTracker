const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require("fs");

module.exports = (client) => {
  client.commandsHandler = async () => {
    const commandsFolders = fs.readdirSync("./src/commands");
    for (const folder of commandsFolders) {
      const commandFiles = fs
        .readdirSync(`./src/commands/${folder}`)
        .filter((file) => file.endsWith(".js"));
      const { commands, commandsArray } = client;
      for (const file of commandFiles) {
        const command = require(`../../commands/${folder}/${file}`);
        commands.set(command.data.name, command);
        commandsArray.push(command.data.toJSON());
      }
      console.log(
        `[TekTracker] Loaded ${commandFiles.length} commands from ${folder} folder!`
      );
    }

    const clientId = "1072168127451902013";
    const guildId = "1072167911902412841";
    const rest = new REST({ version: "9" }).setToken(process.env.token);
    try {
      await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
        body: client.commandsArray,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

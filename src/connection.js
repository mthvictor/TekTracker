const axios = require("axios");
const { user } = process.env;
var userData = {};
const https = require("https");
const fs = require("fs");

async function getPicture(userData) {
  const url = `https://intra.epitech.eu/file/userprofil/profilview/${userData.login}.jpg`;
  const options = {
    headers: {
      Cookie: `user=${user};`,
    },
  };
  https.get(url, options, (response) => {
    response.pipe(fs.createWriteStream("./src/assets/picture.jpg"));
  });
}

module.exports = {
  login: function () {
    axios
      .request({
        url: "https://intra.epitech.eu/user/#!/netsoul",
        method: "GET",
        headers: {
          Cookie: `user=${user}; language=fr; sidebar_fold=false; auth=`,
        },
      })
      .then((response) => {
        console.log(`[TekTracker] Student ${response.data.title} logged in!`);
        for (const key in response.data) userData[key] = response.data[key];
        getPicture(userData);
      })
      .catch((error) => {
        console.error(`! [TekTracker] Error while logging in (${error})`);
      });
  },

  userData: userData,
};

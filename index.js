const { WebClient } = require("@slack/web-api");
const axios = require("axios").default;
const images = {
  morning:
    "https://cloud-e1kfxnjm7-hack-club-bot.vercel.app/0logo_sm_light.png",
  afternoon:
    "https://cloud-77gu0ey02-hack-club-bot.vercel.app/0logo_lg_grey.png",
  night: "https://cloud-or0wstykt-hack-club-bot.vercel.app/0logo_sm.png",
};
async function setPFP() {
  var hour = new Date().getHours() + 5.5;
  let image;
  if (5 < hour && hour < 12) {
    image = await axios.get(images.morning, {
      responseType: "arraybuffer",
    });
  } else if (12 < hour && hour < 17) {
    image = await axios.get(images.afternoon, {
      responseType: "arraybuffer",
    });
  } else {
    image = await axios.get(images.night, {
      responseType: "arraybuffer",
    });
  }
  const client = new WebClient();
  const slackRequest = await client.users.setPhoto({
    image: image.data,
    token: process.env.SLACK_TOKEN,
  });
}

setPFP();

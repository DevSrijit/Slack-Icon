const { WebClient } = require("@slack/web-api");
const axios = require("axios").default;
const images = {
  morning:
    "https://cloud-se00hwg8s-hack-club-bot.vercel.app/2logo_sm_light.png",
  afternoon:
    "https://i.ibb.co/F42m838/LOGO-SM-GREY.png",
  night: "https://cloud-se00hwg8s-hack-club-bot.vercel.app/1logo_sm.png",
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

export default async (req, res) => {
  await setPFP();
  res.send("Started changing your PFP!");
};

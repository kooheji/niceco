const express = require("express");
const axios = require("axios");
const fs = require("fs");
const app = express();
const port = process.env.PORT || 3000;

//Uptime Calculator
app.get("/UpTime/:unixTime", (req, res) => {
  const unixTime = parseInt(req.params.unixTime);
  const currentTime = Math.floor(Date.now() / 1000);
  const timeDiff = currentTime - unixTime;

  const days = Math.floor(timeDiff / (60 * 60 * 24));
  const hours = Math.floor((timeDiff % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((timeDiff % (60 * 60)) / 60);
  const seconds = timeDiff % 60;

  const formattedTime =
    `\`${days.toString().padStart(3, "0")}d\` ` +
    `\`${hours.toString().padStart(2, "0")}h\` ` +
    `\`${minutes.toString().padStart(2, "0")}m\` ` +
    `\`${seconds.toString().padStart(2, "0")}s\``;

  res.send(formattedTime);
});

//Unix Formatter
app.get("/FormatTime/:unixTime", (req, res) => {
  const unixTime = parseInt(req.params.unixTime);
  const days = Math.floor(unixTime / (60 * 60 * 24));
  const hours = Math.floor((unixTime % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((unixTime % (60 * 60)) / 60);
  const seconds = unixTime % 60;

  const formattedTime =
    `\`${days.toString().padStart(3, "0")}d\` ` +
    `\`${hours.toString().padStart(2, "0")}h\` ` +
    `\`${minutes.toString().padStart(2, "0")}m\` ` +
    `\`${seconds.toString().padStart(2, "0")}s\``;

  res.send(formattedTime);
});

//Community Checker
app.get("/Features", (req, res) => {
  const { array } = req.query;

  if (array) {
    const dataArray = array.split(",");
    const found = dataArray.includes("COMMUNITY");

    res.json({ found: found });
  } else {
    res.status(400).json({ error: "Missing array parameter" });
  }
});

//User Flags
app.get("/Flags/:number", (req, res) => {
  const number = parseInt(req.params.number);
  const roles = {
    0: "Discord Employee",
    1: "Partnered Server Owner",
    2: "HypeSquad Events Member",
    3: "Bug Hunter Level 1",
    6: "House Bravery Member",
    7: "House Brilliance Member",
    8: "House Balance Member",
    9: "Early Nitro Supporter",
    14: "Bug Hunter Level 2",
    16: "Verified Bot",
    17: "Early Verified Bot Developer",
    18: "Moderator Programs Alumni",
    22: "Active Developer",
  };

  let userRoles = [];
  for (let i = 0; i <= 22; i++) {
    if (number & (1 << i)) {
      userRoles.push(roles[i]);
    }
  }

  res.send(userRoles.join(" "));
});

//Image to Base64
app.get("/base64", async (req, res) => {
  const imageUrl = req.query.url;
  const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
  const base64Image = Buffer.from(response.data, "binary").toString("base64");
  const imageName = imageUrl.split("/").pop().split(".")[0];

  res.json({
    baseImage: `data:image/png;base64,${base64Image}`,
    imageName: imageName,
  });
});

// Listener
app.get("/", (req, res) => {
  res.send("I'm Alive!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

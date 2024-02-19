const express = require("express");
const app = express();
const PORT = 3000;

//Uptime Calculator
app.get("/uptime/:unixTime", (req, res) => {
  const unixTime = parseInt(req.params.unixTime);
  const currentTime = Math.floor(Date.now() / 1000);
  const timeDiff = currentTime - unixTime;

  const days = Math.floor(timeDiff / (60 * 60 * 24));
  const hours = Math.floor((timeDiff % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((timeDiff % (60 * 60)) / 60);
  const seconds = timeDiff % 60;

  const formattedTime = `${days.toString().padStart(3, "0")}D ${hours
    .toString()
    .padStart(2, "0")}H ${minutes.toString().padStart(2, "0")}M ${seconds
    .toString()
    .padStart(2, "0")}S`;

  res.send(formattedTime);
});

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

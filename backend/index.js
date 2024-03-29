const express = require("express");
const app = express();
const cors = require("cors");

const PORT = 8000;

app.use(cors());

const animals = [
  {
    name: "tiger",
  },
  { name: "elephant" },
];

app.get("/animals", (req, res) => {
  res.json(animals);
});

app.get("/contact", (req, res) => {
  res.json(animals);
});

app.listen(PORT, () => console.log(`It's alive on port ${PORT}`));

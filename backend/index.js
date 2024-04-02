const express = require("express");
const app = express();
const cors = require("cors");

const PORT = 8000;

app.use(cors());

const service = [{
  title: "Visite guidée avec Manu",
  description:
    "Manu vous propose ses services afin de vous faire découvrir plus en détails l'habitat de votre choix. Il vous expliquera la vie ausein de celui-ci et décryptera pour vous la faune et la flore. Pensez à vous positionner dès votre arrivée au parc, les places sont limitées. Service gratuit",
  image: "assets/images/tour-guide-6816049_1280.jpg",
},
{
  title: "Petit Train",
  description: "Faites le tour du zoo à bord du petit train touristique",
  image: "assets/images/panneau.jpg"
}
];

app.get("/service", (req, res) => {
  res.json(service);
});

app.listen(PORT, () => console.log(`It's alive on port ${PORT}`));

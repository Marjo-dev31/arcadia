const express = require("express");
const app = express();
const cors = require("cors");

const PORT = 8000;

app.use(cors());

const services = [
  {
    title: "Visite guidée avec Manu",
    description:
      "Manu vous propose ses services afin de vous faire découvrir plus en détails l'habitat de votre choix. Il vous expliquera la vie ausein de celui-ci et décryptera pour vous la faune et la flore. Pensez à vous positionner dès votre arrivée au parc, les places sont limitées. Service gratuit",
    image: "assets/images/tour-guide-6816049_1280.jpg",
  },
  {
    title: "Petit Train",
    description: "Faites le tour du zoo à bord du petit train touristique",
    image: "assets/images/panneau.jpg",
  },
];

app.get("/services", (req, res) => {
  res.json(services);
});

const habitats = [
  {
    id: 1,
    title: "La Savane",
    description: "lieu aride lorem ipsum",
    image: "assets/images/zoo-1692079_1280.jpg",
    animals: []
  },
  {
    id: 2,
    title: "Les Marais",
    description: "lieu humide à souhait",
    image: "assets/images/little-egret-2591578_1280.jpg",
    animals: [  {
      id: 1,
      firstname: "animal1",
      condition: "bon",
      race: "gazelle",
      image: "",
      veterinarycomments: [],
      employedcomments: []
    },
    {
      id:2,
      firstname: "animal2",
      condition: "mauvais",
      race: "lion",
      rapport: "chichi",
      image: "",
      veterinarycomments: [],
      employedcomments: []
    },]
  },
];

app.get("/habitats", (req, res) => {
  res.json(habitats);
});

const animals = [
  {
    id: 1,
    firstname: "animal1",
    condition: "bon",
    race: "gazelle",
    image: "",
    veterinarycomments: [],
    employedcomments: []
  },
  {
    id:2,
    firstname: "animal2",
    condition: "mauvais",
    race: "lion",
    rapport: "chichi",
    image: "",
    veterinarycomments: [],
    employedcomments: []
  },
];

app.get("/animal", (req, res) => {
  res.json(animals);
});

app.listen(PORT, () => console.log(`It's alive on port ${PORT}`));

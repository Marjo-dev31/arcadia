import express from "express";
import dotenv from "dotenv";
import ip from 'ip';
import cors from 'cors';
import uuidv4 from 'uuidv4';
import Response from './domain/response.js';
import httpStatus from './controller/service.controller.js';
import logger from './util/logger.js';


dotenv.config();
const PORT = process.env.SERVER_PORT || 8000;
const app = express();

app.use(cors());
app.use(express.json());
// app.use(require('body-parser').json());


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

const reviews = [
  {
    id: 1,
    pseudo: 'Manon',
    content: 'Agreable moment en famille',
    date: '12/03/2023'
  },
  {
    id: 2,
    pseudo: 'Vanessa',
    content: 'Animaux heureux',
    date: '08/06/2023'
  },
  {
    id: 3,
    pseudo: 'Laurie',
    content: 'De belles prestations',
    date: '05/04/2024'
  }
];

app.get("/avis", (req,res)=> {
  res.json(reviews)
})


app.post("/avis", (req, res)=> {
  req.body.id = uuidv4()
  // console.log(req.body, 'toto')
  reviews.push(req.body);
  return res.send(req.body)
})



app.get('/test', (req, res)=> res.send(new Response(httpStatus.OK.code, httpStatus.OK.status, 'Test API, all Systems Go')));


app.listen(PORT, () => logger.info(`It's alive on: ${ip.address()}: ${PORT}`));

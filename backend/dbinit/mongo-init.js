import secrets from '../src/util/secretmanager.js'

const secretsValues = await secrets()


db = db.getSiblingDB('arcadia');

db.createUser({
    user: secretsValues.MONGO_INITDB_USERNAME,
    pwd: secretsValues.MONGO_INITDB_PASSWORD,
    roles: [{ role: 'readWrite', db: 'arcadia' }]
  });

db.createCollection('animals');

db.createCollection('opening');

db.animals.insertMany([
    { "firstname": "Edward", "clickCount": 0},
    { "firstname": "Alphonse", "clickCount": 0},
    { "firstname": "Winry", "clickCount": 0},
    { "firstname": "Roy", "clickCount": 0},
    { "firstname": "Greed", "clickCount": 0},
    { "firstname": "Scar", "clickCount": 0},
    { "firstname": "Izumi", "clickCount": 0},
    { "firstname": "Pinako", "clickCount": 0},
    { "firstname": "Maes", "clickCount": 0}
])

db.opening.insert(
    { "openingTime": "9h00", "closingTime": "19h00", "openingDay": "Lundi", "closingDay": "Dimanche" }
)



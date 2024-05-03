
db = db.getSiblingDB('arcadia');

db.createCollection('animals');

db.createCollection('opening');

db.animals.insertMany([
    { "firstname": "Frodon", "clickCount": 0},
    { "firstname": "Sam", "clickCount": 0},
    { "firstname": "Pippin", "clickCount": 0},
    { "firstname": "Merry", "clickCount": 0},
    { "firstname": "Gandalf", "clickCount": 0},
    { "firstname": "Galadrielle", "clickCount": 0},
    { "firstname": "Arwen", "clickCount": 0},
    { "firstname": "Gimli", "clickCount": 0},
    { "firstname": "Legolas", "clickCount": 0}
])

db.opening.insert(
    { "openingTime": "9h00", "closingTime": "19h00", "openingDay": "Lundi", "closingDay": "Dimanche" }
)


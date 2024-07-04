# Arcadia

A website of a Zoo in Britain for visitors, director and employees.
For visitors, use to check habitats, services, animals and opening.
For director, veterinaries and employees, use to manage habitats, services, animals, opening, meals, contact, and reviews.

# Prerequisites globally
node.js v20.22.1
npm v10.2.4
angular/cli v17.3.0
git version 2.34.1

"dependencies":
_frontend:_
 {
    "@angular/animations": "^17.3.0",
    "@angular/cdk": "^17.3.3",
    "@angular/common": "^17.3.0",
    "@angular/compiler": "^17.3.0",
    "@angular/core": "^17.3.0",
    "@angular/forms": "^17.3.0",
    "@angular/material": "^17.3.3",
    "@angular/platform-browser": "^17.3.0",
    "@angular/platform-browser-dynamic": "^17.3.0",
    "@angular/router": "^17.3.0",
    "rxjs": "~7.8.0",
    "tslib": "^2.3.0",
    "uuid": "^9.0.1",
    "uuidv4": "^6.2.13",
    "zone.js": "~0.14.3"
    }
        "devDependencies": {
    "@angular-devkit/build-angular": "^17.3.2",
    "@angular/cli": "^17.3.2",
    "@angular/compiler-cli": "^17.3.0",
    "@types/jasmine": "~5.1.0",
    "jasmine-core": "~5.1.0",
    "karma": "~6.4.0",
    "karma-chrome-launcher": "~3.2.0",
    "karma-coverage": "~2.2.0",
    "karma-jasmine": "~5.1.0",
    "karma-jasmine-html-reporter": "~2.1.0",
    "typescript": "~5.4.2"
  }
_backend:_
{
    "bcrypt": "^5.1.1",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "express-fileupload": "^1.5.0",
    "ip": "^2.0.1",
    "jsonwebtoken": "^9.0.2",
    "mailtrap": "^3.3.0",
    "mongodb": "^6.6.2",
    "mongoose": "^8.3.3",
    "mysql": "^2.18.1",
    "pino": "^8.20.0",
    "pino-pretty": "^11.0.0",
    "uuid": "^9.0.1",
    "uuidv4": "^6.2.13"
}
    "devDependencies": {
        "nodemon": "^3.1.0"
    }

# Create directory and clone repository:
```
mkdir <directoryNameToChoose>
install git
git clone https://github.com/Marjo-dev31/arcadia
```

# Install prerequisites and run application
## API
### navigate
`cd arcadia/backend`
### download and install Node.js
`node install 20`
### verifies the right Node.js version is in the environment
`node -v`
### verifies the right NPM version is in the environment
`npm -v`
### run
`npm run dev` (for NODE_ENV=dev nodemon src/index.js)
`npm run start` (for NODE_ENV=prod node src/index.js) 

## Frontend
### navigate
`cd ..`
`cd frontend/arcadia`
### download and install Node.js
`node install 20`
### verifies the right Node.js version is in the environment
`node -v`
### verifies the right NPM version is in the environment
`npm -v`
### run angular
`cd arcadia/frontend/arcadia`
`ng serve` (for development environment)
`ng build` (for production environment) 

# See code in VS CODE
In new terminal
`cd arcadia`
`code .`


# More
API port : 8000
Angular port : 4200
sql deploy on AWS database port 3306
nosql deploy on Cluster Atlas port 27017
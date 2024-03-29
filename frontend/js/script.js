fetch("http://localhost:8000/animals")
  .then(response =>
    response.json()
  )
  .then(animals => console.log(animals));


fetch("http://localhost:8000/contact")
.then( response=> 
   response.json())
.then( (animals) => {
    for (const animal of animals) {
        console.log(animal.name)
  }  })
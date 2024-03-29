const http = "http://localhost:8000";


fetch(`${http}/animals`)
  .then(response =>
    response.json()
  )
  .then(animals => console.log(animals));


fetch(`${http}/contact`)
.then( response=> 
   response.json())
.then( (animals) => {
    for (const animal of animals) {
        const reviewsSection = document.querySelector('.reviews-section');
        console.log(reviewsSection, 'toto')
        const pElement = document.createElement('p');
        pElement.append(animal.name)
        reviewsSection.append(pElement);
        console.log(animal.name)
  }  })
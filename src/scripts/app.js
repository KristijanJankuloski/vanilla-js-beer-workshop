const BASE_URL = "https://api.punkapi.com/v2/beers";

function createBeerCard(beer){
    const card = document.createElement('div');
    card.className = "card";
    const cardImg = document.createElement('img');
    cardImg.className = "card-img-top";
    cardImg.src = beer.image_url;
    cardImg.height = 200;
    cardImg.width = 30;
    card.appendChild(cardImg);
    const cardBody = document.createElement("div");
    cardBody.className = "card-body";
    const cardTitle = document.createElement('h4');
    cardTitle.className = "card-title";
    cardTitle.innerText = beer.name;
    cardBody.appendChild(cardTitle);
    const cardText = document.createElement('p');
    cardText.className = "card-text";
    cardText.innerText = beer.description;
    cardBody.appendChild(cardText);
    card.appendChild(cardBody);
    return card;
}

function renderBeers(beers){
    const container = document.querySelector(".item-container");
    container.innerHTML = "";
    beers.forEach(beer => {
        container.appendChild(createBeerCard(beer));
    });
}

document.querySelector("#list-beers-link").addEventListener('click', e => {
    e.preventDefault();
    fetch(BASE_URL).then(response => response.json()).then(data => {
        renderBeers(data);
    });
});
const BASE_URL = "https://api.punkapi.com/v2/beers";
let currentBeerList = [];
let currentPage = 1;

function beerDetailsPage(beer){
    document.querySelector(".detail-content").style.display = "block";
    document.querySelector("#main-content").style.display = "none";
    const imgContainer = document.querySelector("#detail-img");
    imgContainer.innerHTML = "";
    const detailBody = document.querySelector("#detail-body");
    detailBody.innerHTML = "";
    const beerImg = document.createElement("img");
    beerImg.className = "detail-img";
    beerImg.src = beer.image_url;
    imgContainer.appendChild(beerImg);
    const card = document.createElement('div');
    card.className = "card";
    const cardHead = document.createElement('div');
    cardHead.className = "card-header";
    const cardTitle = document.createElement('h3');
    cardTitle.className = "card-title";
    cardTitle.innerText = beer.name;
    cardHead.appendChild(cardTitle);
    const cardSlogan = document.createElement('p');
    cardSlogan.className = "card-text";
    cardSlogan.innerText = beer.tagline;
    cardHead.appendChild(cardSlogan);
    card.appendChild(cardHead);
    const cardBody = document.createElement('div');
    cardBody.className = "card-body";
    const cardDescription = document.createElement('p');
    cardDescription.className = "card-text";
    cardDescription.innerText = beer.description;
    cardBody.appendChild(cardDescription);
    const cardAbv = document.createElement('p');
    cardAbv.className = "card-text";
    cardAbv.innerText = `Alcohol: ${beer.abv}%`;
    cardBody.appendChild(cardAbv);
    const brewDate = document.createElement('p');
    brewDate.className = "card-text";
    brewDate.innerText = `Brewed: ${beer.first_brewed}`;
    cardBody.appendChild(brewDate);
    const cardBitterness = document.createElement('p');
    cardBitterness.className = "card-text";
    cardBitterness.innerText = `Bitterness: ${beer.ibu} IBU`;
    cardBody.appendChild(cardBitterness);
    card.appendChild(cardBody);
    const cardFooter = document.createElement('div');
    cardFooter.className = "card-footer";
    const foodPair = document.createElement('h4');
    foodPair.innerText = "Food pairing";
    cardFooter.appendChild(foodPair);
    for(let food of beer.food_pairing){
        const newFood = document.createElement('p');
        newFood.innerText = `"${food}"`;
        cardFooter.appendChild(newFood);
    }
    card.appendChild(cardFooter);
    detailBody.appendChild(card);
}

function createBeerCard(beer){
    const card = document.createElement('div');
    card.className = "card col";
    const cardImg = document.createElement('img');
    const cardImgDiv = document.createElement('div');
    cardImgDiv.className = "d-flex justify-content-center";
    cardImg.className = "card-img-top img-card";
    cardImg.src = beer.image_url;
    cardImgDiv.appendChild(cardImg);
    card.appendChild(cardImgDiv);
    const cardBody = document.createElement("div");
    cardBody.className = "card-body";
    const cardTitle = document.createElement('h4');
    cardTitle.className = "card-title";
    cardTitle.innerText = beer.name;
    cardBody.appendChild(cardTitle);
    const cardText = document.createElement('p');
    cardText.className = "card-text";
    cardText.innerText = beer.tagline;
    cardBody.appendChild(cardText);
    const cardButton = document.createElement('button');
    cardButton.className = "btn btn-sm btn-primary";
    cardButton.innerText = "More details";
    cardButton.addEventListener('click', e =>{
        fetch(`${BASE_URL}/${beer.id}`).then(response => response.json()).then(data => {
            console.log(data);
            beerDetailsPage(data[0]);
        });
    });
    cardBody.appendChild(cardButton);
    card.appendChild(cardBody);
    return card;
}

function renderBeers(beers){
    document.querySelector("#main-content").style.display = "block";
    document.querySelector(".detail-content").style.display = "none";
    document.querySelector(".hero-container").innerHTML = "";
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
document.querySelector("#hero-action-btn").addEventListener('click', e => {
    e.preventDefault();
    fetch(BASE_URL).then(response => response.json()).then(data => {
        renderBeers(data);
    });
});

document.querySelector("#logo-brand").addEventListener('click', e => {
    e.preventDefault();
    location.reload();
});

document.querySelector("#back-btn").addEventListener('click', () => {
    document.querySelector("#main-content").style.display = "block";
    document.querySelector(".detail-content").style.display = "none";
});
import {BASE_URL} from "./constants.js";

export default function createBeerCard(beer, detailBuild){
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
            detailBuild(data[0]);
        });
    });
    cardBody.appendChild(cardButton);
    card.appendChild(cardBody);
    return card;
}

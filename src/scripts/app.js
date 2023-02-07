import beerDetailsPage from "./detailsPageBuilder.js";
import createBeerCard from "./cardBuilder.js";
import {BASE_URL} from "./constants.js"

let currentBeerList = [];
let currentPage = 1;

function renderBeers(beers){
    document.querySelector("#main-content").style.display = "block";
    document.querySelector(".detail-content").style.display = "none";
    document.querySelector(".hero-container").innerHTML = "";
    const container = document.querySelector(".item-container");
    container.innerHTML = "";
    beers.forEach(beer => {
        container.appendChild(createBeerCard(beer, beerDetailsPage));
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
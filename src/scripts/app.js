import {BASE_URL} from "./constants.js"
import beerDetailsPage from "./detailsPageBuilder.js";
import createBeerCard from "./cardBuilder.js";

let currentBeerList = [];
let currentPage = 1;

function renderBeers(beers){
    document.querySelector("#main-content").style.display = "block";
    document.querySelector(".detail-content").style.display = "none";
    document.querySelector(".hero-container").classList.add('hidden');
    const container = document.querySelector(".item-container");
    container.innerHTML = "";
    beers.forEach(beer => {
        container.appendChild(createBeerCard(beer));
    });
}

document.querySelector("#list-beers-link").addEventListener('click', e => {
    e.preventDefault();
    fetch(BASE_URL).then(response => response.json()).then(data => {
        currentBeerList = data;
        renderBeers(data);
    });
});

document.querySelector("#get-random-beer").addEventListener('click', e => {
    e.preventDefault();
    fetch(`${BASE_URL}/random`).then(response => response.json()).then(data => {
        document.querySelector(".hero-container").classList.add('hidden');
        beerDetailsPage(data[0]);
    });
});

document.querySelector("#hero-action-btn").addEventListener('click', e => {
    e.preventDefault();
    fetch(BASE_URL).then(response => response.json()).then(data => {
        currentBeerList = data;
        renderBeers(data);
    });
});

document.querySelector("#logo-brand").addEventListener('click', e => {
    e.preventDefault();
    location.reload();
});

document.querySelector("#search-form").addEventListener('submit', e => {
    e.preventDefault();
    let keyword = document.querySelector("#search-input").value;
    keyword = keyword.replaceAll(" ", "_");
    fetch(`${BASE_URL}?beer_name=${keyword}`).then(response => response.json()).then(data => {
        if(!data.length) {
            console.log("No beers matching keyword");
            return;
        }
        currentBeerList = data;
        renderBeers(data);
        e.target.reset();
    });
});

document.querySelector("#sort-by-name-asc").addEventListener('click', e => {
    e.preventDefault();
    currentBeerList = currentBeerList.sort((a,b) =>{
        if(a.name < b.name)
            return -1;
        if(a.name > b.name)
            return 1;
        return 0;
    });
    renderBeers(currentBeerList);
});

document.querySelector("#sort-by-name-des").addEventListener('click', e => {
    e.preventDefault();
    currentBeerList = currentBeerList.sort((a,b) =>{
        if(a.name < b.name)
            return 1;
        if(a.name > b.name)
            return -1;
        return 0;
    });
    renderBeers(currentBeerList);
});

document.querySelector("#sort-by-abv-asc").addEventListener('click', e => {
    e.preventDefault();
    currentBeerList = currentBeerList.sort((a,b) => a.abv-b.abv);
    renderBeers(currentBeerList);
});

document.querySelector("#sort-by-abv-des").addEventListener('click', e => {
    e.preventDefault();
    currentBeerList = currentBeerList.sort((a,b) => b.abv-a.abv);
    renderBeers(currentBeerList);
});

document.querySelector("#sort-by-ibu-asc").addEventListener('click', e => {
    e.preventDefault();
    currentBeerList = currentBeerList.sort((a,b) => a.ibu-b.ibu);
    renderBeers(currentBeerList);
});

document.querySelector("#sort-by-ibu-des").addEventListener('click', e => {
    e.preventDefault();
    currentBeerList = currentBeerList.sort((a,b) => b.ibu-a.ibu);
    renderBeers(currentBeerList);
});

document.querySelector("#sort-by-date-asc").addEventListener('click', e => {
    e.preventDefault();
    currentBeerList = currentBeerList.sort((a,b) =>{
        let aDate = a.first_brewed.split("/");
        let bDate = b.first_brewed.split("/");
        return new Date(`${aDate[1]}-${aDate[0]}-01`) - new Date(`${bDate[1]}-${bDate[0]}-01`);
    });
    renderBeers(currentBeerList);
});

document.querySelector("#sort-by-date-des").addEventListener('click', e => {
    e.preventDefault();
    currentBeerList = currentBeerList.sort((a,b) =>{
        let aDate = a.first_brewed.split("/");
        let bDate = b.first_brewed.split("/");
        return new Date(`${bDate[1]}-${bDate[0]}-01`) - new Date(`${aDate[1]}-${aDate[0]}-01`);
    });
    renderBeers(currentBeerList);
});

document.querySelector("#back-btn").addEventListener('click', () => {
    document.querySelector("#main-content").style.display = "block";
    document.querySelector(".detail-content").style.display = "none";
});
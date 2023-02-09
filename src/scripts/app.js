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

document.querySelector("#list-beers-link").addEventListener('click', async e => {
    e.preventDefault();
    try {
        const response = await fetch(BASE_URL);
        const data = await response.json();
        currentBeerList = data;
        renderBeers(data);
    }
    catch (err) {
        console.error(err);
    }
});

document.querySelector("#get-random-beer").addEventListener('click', async e => {
    e.preventDefault();
    try {
        const response = await fetch(`${BASE_URL}/random`);
        const data = await response.json();
        document.querySelector(".hero-container").classList.add('hidden');
        beerDetailsPage(data[0]);
    }
    catch (err) {
        console.error(err);
    }
});

document.querySelector("#hero-action-btn").addEventListener('click', async e => {
    e.preventDefault();
    try {
        const response = await fetch(BASE_URL);
        const data = await response.json();
        currentBeerList = data;
        renderBeers(data);
    }
    catch (err) {
        console.error(err);
    }
});

document.querySelector("#logo-brand").addEventListener('click', e => {
    e.preventDefault();
    location.reload();
});

document.querySelector("#search-form").addEventListener('submit', async e => {
    e.preventDefault();
    const loader = document.querySelector(".loading-spinner");
    loader.classList.remove('hidden');
    let keyword = document.querySelector("#search-input").value;
    keyword = keyword.replaceAll(" ", "_");
    try {
        const response = await fetch(`${BASE_URL}?beer_name=${keyword}`);
        const data = await response.json();
        if(!data.length) {
            console.log("No beers matching keyword");
            loader.classList.add('hidden');
            let errAlert = document.querySelector(".search-error");
            errAlert.classList.remove('hidden');
            return;
        }
        currentBeerList = data;
        renderBeers(data);
        loader.classList.add('hidden');
        e.target.reset();
    }
    catch (err) {
        let errAlert = document.querySelector(".search-error");
        errAlert.classList.remove('hidden');
        console.error(err);
    }
});

document.querySelector("#no-beer-err").addEventListener('click', () => {
    let errAlert = document.querySelector(".search-error");
    errAlert.classList.add('hidden');
})

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
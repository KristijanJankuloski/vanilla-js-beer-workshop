# Beer World workshop
This workshop is a **single page web-app** about all things beer. It is made using **HTML**, **CSS**, vanilla **JavaScript** and libraries for UI like **Bootstrap** and **Font Awesome**.
## Project structure
The entire project is loaded in the `index.html` which loads the font awesome and bootstrap libraries as well as the javascript module contained in `app.js`.
#### JavaScript sub-division
The [app.js](https://github.com/chrissjj/vanilla-js-beer-workshop/blob/master/src/scripts/app.js) started as a single file that kept getting bigger, so I decided to split up the file in to several standalone modules that do certain tasks. 

> `constants.js` contains all the constants that will be used though the project like the url for the api

> `cardBuilder.js` that makes individual cards for a given list

> `detailsPageBuilder.js` that makes a details page for a given beer

All modules export the required functions and variables and import modules as needed.
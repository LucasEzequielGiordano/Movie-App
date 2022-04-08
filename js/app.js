/* Code order
 * call elements from HTML
 * events
 * functions
 */
// calling the elements
const h1 = document.querySelector("h1");
const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");

// event for reload page
h1.addEventListener("click", () => {
    window.location.reload()
})

// event by clicking on search, filter movies
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchTerm = search.value;
    if (searchTerm) {
        getMovies(searchApi + searchTerm);
        search.value = "";
    }
});

// function async/await for get movies of the API
async function getMovies(urlApi) {
    const res = await fetch(urlApi);
    const data = await res.json();
    console.log(data);
    // call function for show movies
    showMovies(data.results);
}

// function show movies
function showMovies(movies) {
    // clear main with empty string
    main.innerHTML = "";
    // I run the movies through the api and show their features
    movies.forEach((movie) => {
        const {
            poster_path,
            title,
            vote_average,
            overview
        } = movie;
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie");
        movieCard.innerHTML = `
            <img src="${imgApi + poster_path}" alt="${title}"/>
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRating(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3 class="overviewTitle">Overview:</h3>
                ${overview}
            </div>
            `;
        main.appendChild(movieCard);
    });
}

// function depending on the rating, I get different colors 
function getClassByRating(vote) {
    if (vote >= 8) {
        return "green";
    } else if (vote >= 5) {
        return "orange";
    } else {
        return "red";
    }
}

// initially get movies
getMovies(urlApi)
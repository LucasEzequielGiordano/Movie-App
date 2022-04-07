// url API 'themoviedb'
const urlApi = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const imgApi = "https://image.tmdb.org/t/p/w1280";
const searchApi = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

// I call the elements by id
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

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
        console.log(movie)
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie");

        movieCard.innerHTML = `
        <img src="${imgApi + poster_path}" alt="${title}"/>
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
            <h3>Overview:</h3>
            ${overview}
        </div>
        `;
        main.appendChild(movieCard);
    });
}

function getClassByRate(vote) {
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
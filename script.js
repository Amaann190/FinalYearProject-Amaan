const apiBaseUrl = "https://api.themoviedb.org/3";
const apiKey = "0cbba2de0cef4797f5b50b633a405395";
const imageBaseUrl = 'https://image.tmdb.org/t/p/w300'

const moviesGrid = document.getElementById("movies-grid");
const searchInput = document.getElementById("search-input");
const searchForm = document.getElementById("search-form");
const catergorytilte = document.getElementById("category-title")  

async function fetchMoviesNowPlaying() {
    const response = await fetch(`${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`);
    const jsonResponse = await response.json();
	const movies = jsonResponse.results;
    displayMovies(movies);
}

async function searchMovies(query) {
    const response = await fetch(`${apiBaseUrl}/search/movie?api_key=${apiKey}&query="${query}"`);
    const jsonResponse = await response.json();
	const movies = jsonResponse.results;
    displayMovies(movies);
}

function displayMovies(movies) {
    moviesGrid.innerHTML = movies.map(movie => 
			`<div class="movie-card" onclick="showMovieDetails(${movie.id})">
	            <img src="${imageBaseUrl}${movie.poster_path}"/>
	            <p>⭐ ${movie.vote_average}</p>
	            <h1>${movie.title}</h1>
	        </div>`
    ).join("");
}


function handleSearchFormSubmit(event) {
    catergorytilte.innerHTML = "Search-Results";
    event.preventDefault();
    const searchQuery = searchInput.value;
    const movies = searchMovies(searchQuery);
    displayMovies(movies);
}

function showMovieDetails(movieId) {
    window.location.href = `movie-details.html?id=${movieId}`;
}

searchForm.addEventListener("submit", handleSearchFormSubmit);
fetchMoviesNowPlaying();

const apiBaseUrl = "https://api.themoviedb.org/3";
const apiKey = "0cbba2de0cef4797f5b50b633a405395";
const imageBaseUrl = 'https://image.tmdb.org/t/p/w300';

const moviesGrid = document.getElementById("movies-grid");
const tvSeriesGrid = document.getElementById("tv-series-grid"); // Added tvSeriesGrid
const searchInput = document.getElementById("search-input");
const searchForm = document.getElementById("search-form");
const categoryTitle = document.getElementById("category-title");
const tvCategoryTitle = document.getElementById("tv-category-title"); // Added tvCategoryTitle

async function fetchMoviesNowPlaying() {
    const response = await fetch(`${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`);
    const jsonResponse = await response.json();
    const movies = jsonResponse.results;
    displayMedia(movies, moviesGrid);
}

async function fetchTrendingTVShows() {
    const response = await fetch(`${apiBaseUrl}/trending/tv/week?api_key=${apiKey}`);
    const jsonResponse = await response.json();
    const tvShows = jsonResponse.results;
    displayMedia(tvShows, tvSeriesGrid); // Display trending TV shows in tvSeriesGrid
}


async function searchMedia(query) {
    const response = await fetch(`${apiBaseUrl}/search/multi?api_key=${apiKey}&query=${query}`);
    const jsonResponse = await response.json();
    const media = jsonResponse.results;
    displayMedia(media, moviesGrid); // Display search results in moviesGrid
}

function displayMedia(media, gridElement) {
    gridElement.innerHTML = media.map(item => {
        let mediaType = item.title ? 'movie' : 'tv'; // Check for the existence of title property
        return `<div class="media-card" onclick="showMediaDetails('${mediaType}', ${item.id})">
                    <img src="${imageBaseUrl}${item.poster_path}" alt="${item.title || item.name} Poster"/>
                    <p>⭐ ${item.vote_average}</p>
                    <h1>${item.title || item.name}</h1>
                    <p>Type: ${mediaType === 'movie' ? 'Movie' : 'TV Show'}</p>
                </div>`;
    }).join("");
}



function handleSearchFormSubmit(event) {
    categoryTitle.innerHTML = "Search Results";
    tvCategoryTitle.style.display = "none"; // Hide TV category title
    event.preventDefault();
    const searchQuery = searchInput.value;
    searchMedia(searchQuery);
}


function showMediaDetails(mediaType, mediaId) {
    if (mediaType === 'movie') {
        window.location.href = `movie-details.html?id=${mediaId}`;
    } else if (mediaType === 'tv') {
        window.location.href = `tv-series-details.html?id=${mediaId}`;
    }
}

function redirectToFavorites() {
    window.location.href = 'favorites.html';
}




searchForm.addEventListener("submit", handleSearchFormSubmit);
fetchMoviesNowPlaying();
fetchTrendingTVShows(); 



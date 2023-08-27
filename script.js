const apiKey = "949304da343b94a77b3b488ef8062abb";
const apiUrl = "https://api.themoviedb.org/3/";
const container = document.getElementById("container");
const searchInput = document.getElementById("search-input");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");

// Función para cargar películas de una página específica
async function loadMoviesByPage(pageNumber) {
    try {
        const response = await fetch(`${apiUrl}discover/movie?api_key=${apiKey}&page=${pageNumber}&language=es`);
        const data = await response.json();

        const movies = data.results;

        movies.forEach(movie => {
            const card = createMovieCard(movie);
            container.appendChild(card);
        });
    } catch (error) {
        console.error("Error loading movies:", error);
    }
}


// Función para cargar todas las páginas de películas
async function loadAllMovies() {
    try {
        const response = await fetch(`${apiUrl}discover/movie?api_key=${apiKey}&page=1&language=es`);
        const data = await response.json();
        const totalPages = data.total_pages;

        for (let page = 1; page <= totalPages; page++) {
            await loadMoviesByPage(page);
        }
    } catch (error) {
        console.error("Error loading movies:", error);
    }
}

// Función para crear tarjeta de película
function createMovieCard(movie) {
    const card = document.createElement("div");
    card.classList.add("movie-card");

    const title = document.createElement("h2");
    title.textContent = movie.title;

    const year = document.createElement("p");
    year.textContent = `Año: ${movie.release_date.substring(0, 4)}`;

    const overview = document.createElement("p");
    overview.textContent = movie.overview;

    const poster = document.createElement("img");
    poster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    poster.alt = movie.title;

    card.appendChild(title);
    card.appendChild(year);
    card.appendChild(overview);
    card.appendChild(poster);

    return card;
}

// Cargar todas las páginas al cargar la página
window.addEventListener("load", () => {
    loadAllMovies();
});

// Agregar evento de escucha al campo de búsqueda
searchInput.addEventListener("input", () => {
    filterMovies(searchInput.value);
});

// Función para filtrar películas por título
function filterMovies(keyword) {
    const movieCards = document.querySelectorAll(".movie-card");
    keyword = keyword.toLowerCase();

    movieCards.forEach(card => {
        const title = card.querySelector("h2").textContent.toLowerCase();
        if (title.includes(keyword)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

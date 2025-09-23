const movies = [
    { title: "Inception", rating: "8.8", poster: "https://m.media-amazon.com/images/I/51zUbui+gbL._AC_.jpg" },
    { title: "Interstellar", rating: "8.6", poster: "https://m.media-amazon.com/images/I/81p+xe8cbnL._AC_SY679_.jpg" },
    { title: "The Dark Knight", rating: "9.0", poster: "https://m.media-amazon.com/images/I/51EbJjlYFVL._AC_.jpg" },
    { title: "Avatar", rating: "7.8", poster: "https://m.media-amazon.com/images/I/41kTVLeW1CL._AC_.jpg" },
    { title: "Titanic", rating: "7.8", poster: "https://m.media-amazon.com/images/I/51o5dnjk07L._AC_.jpg" },
    { title: "Joker", rating: "8.5", poster: "https://m.media-amazon.com/images/I/81nzD3vR3-L._AC_SY679_.jpg" },
    { title: "Avengers: Endgame", rating: "8.4", poster: "https://m.media-amazon.com/images/I/81ExhpBEbHL._AC_SY679_.jpg" },
    { title: "The Matrix", rating: "8.7", poster: "https://m.media-amazon.com/images/I/51EG732BV3L.jpg" }
];

const movieGrid = document.getElementById('movieGrid');
const searchInput = document.getElementById('search');

function displayMovies(moviesToDisplay){
    movieGrid.innerHTML = '';
    moviesToDisplay.forEach(movie => {
        const card = document.createElement('div');
        card.classList.add('movie-card');
        card.innerHTML = `
            <img src="${movie.poster}" alt="${movie.title}">
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <p>⭐ ${movie.rating}</p>
            </div>
        `;
        movieGrid.appendChild(card);
    });
}

// Initial display
displayMovies(movies);

// Search functionality
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(searchTerm));
    displayMovies(filteredMovies);
});

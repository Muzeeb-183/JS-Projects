const searchForm = document.querySelector('form');
const movieContainer = document.querySelector('.movie-container');
const inputBox = document.querySelector('.inputBox');
const loadingIndicator = document.createElement('p'); // Loading indicator element
loadingIndicator.classList.add('loading');
loadingIndicator.innerText = 'Loading...'; // Text for the loading indicator

// Function to fetch movie details using Omdbi API
const getMovieInfo = async (Movie) => {
    try {
        showLoadingIndicator(); // Show loading indicator
        const apiKey = "d8727693";
        const url = `https://www.omdbapi.com/?apikey=${apiKey}&t=${Movie}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Unable to fetch movie data");
        }
        const data = await response.json();
        
        hideLoadingIndicator(); // Hide loading indicator

        if (data.Response === "True") {
            showMovieDate(data);
        } else {
            showErroMsg(`No Movie Found!!!!`);
        }
    } catch (error) {
        hideLoadingIndicator(); // Hide loading indicator
        showErroMsg(`No Movie Found!!!!`);
    }
};

// Function to show movie data on screen
const showMovieDate = (data) => {
    movieContainer.innerHTML = ""; // Clear previous data

    const { Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster } = data;

    const movieElement = document.createElement('div');
    movieElement.classList.add('movie-info');

    movieElement.innerHTML = `<h2>${Title}</h2>
                              <p><strong>Rating:</strong>⭐${imdbRating}</p>`;

    const movieGenreElement = document.createElement('div');
    movieGenreElement.classList.add('movie-genre');

    Genre.split(',').forEach(element => {
        const p = document.createElement('p');
        p.innerText = element;
        movieGenreElement.appendChild(p);
    });

    movieElement.appendChild(movieGenreElement);

    movieElement.innerHTML += `<p><strong>Released:</strong>${Released}</p>
                              <p><strong>Runtime:</strong>${Runtime}</p>
                              <p><strong>Cast:</strong>${Actors}</p>
                              <p><strong>Plot:</strong>${Plot}</p>`;

    const moviePoster = document.createElement('div');
    moviePoster.classList.add('moviePoster');
    moviePoster.innerHTML = `<img src="${Poster}" alt="Poster of ${Title}">`;

    movieContainer.appendChild(movieElement);
    movieContainer.prepend(moviePoster);
};

// Function to display error messages
const showErroMsg = (msg) => {
    movieContainer.innerHTML = `<h2>${msg}</h2>`;
};

// Function to show the loading indicator
const showLoadingIndicator = () => {
    movieContainer.innerHTML = ""; // Clear any existing content
    movieContainer.appendChild(loadingIndicator); // Add the loading indicator
};

// Function to hide the loading indicator
const hideLoadingIndicator = () => {
    if (movieContainer.contains(loadingIndicator)) {
        movieContainer.removeChild(loadingIndicator); // Remove the loading indicator
    }
};

// Event listener for searchForm
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const movieName = inputBox.value.trim();
    if (movieName !== "") {
        getMovieInfo(movieName);
    } else {
        showErroMsg(`Please Enter Movie Name to get Information`);
    }
});

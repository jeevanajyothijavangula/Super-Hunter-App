// Define the API endpoint and your keys
const publicKey = 'ae4b4f0b1421c11a72f0f8dae2c2f511';
const privateKey = '7a4eb170d021356469f54bbba41a18de6db27912';
const baseURL = 'https://gateway.marvel.com:443/v1/public/characters';
const limit = 30; // Adjust the number of results as needed


// Function to generate the MD5 hash
function generateHash(ts) {
    const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();
    return hash;
}

// Function to fetch superheroes from Marvel API
function fetchSuperheroes(searchQuery) {
    const ts = new Date().getTime().toString();
    const hash = generateHash(ts);

    // Construct the API URL
    let apiUrl = `${baseURL}?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=${limit}`;

    // Include the search query if provided
    if (searchQuery) {
        apiUrl += `&nameStartsWith=${searchQuery}`;
    }

    // Make the API request
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Step 4: Process and display superheroes data
            displaySuperheroes(data.data.results);
        })
        .catch(error => {
            console.error('Error fetching superheroes:', error);
        });
}

//function to display the Superheros in UI.
function displaySuperheroes(superheroes) {
    const superheroesContainer = document.getElementById('superheroes');
    superheroesContainer.innerHTML = '';

    superheroes.forEach(superhero => {
        // Create a table row for each superhero
        const tableRow = document.createElement('tr');

        // Create a table cell for the superhero's information
        const tableCell = document.createElement('td');

        // Create a card div for the superhero
        const cardDiv = document.createElement('span');
        cardDiv.classList.add('card', 'custom-card');

        // Create an image element for the superhero
        const img = document.createElement('img');
        img.src = `${superhero.thumbnail.path}.${superhero.thumbnail.extension}`;
        img.style.width = '100%';

        // Create a heading for the superhero's name
        const nameHeading = document.createElement('h2');
        nameHeading.textContent = superhero.name;

        // Create a paragraph for the superhero's description
        const descriptionParagraph = document.createElement('p');
        descriptionParagraph.textContent = superhero.description || 'No description available.';

        // Create "Add to Favorites" and "Book" buttons
        const addToFavoritesButton = document.createElement('button');
        addToFavoritesButton.textContent = 'Add to Favorites';
        addToFavoritesButton.addEventListener('click', () => addToFavorites(superhero));

        // Append elements to the card div
        cardDiv.appendChild(img);
        cardDiv.appendChild(nameHeading);
        cardDiv.appendChild(descriptionParagraph);
        cardDiv.appendChild(addToFavoritesButton);

        // Append the card div to the table cell
        tableCell.appendChild(cardDiv);

        // Append the table cell to the table row
        tableRow.appendChild(tableCell);

        // Append the table row to the superheroes container
        superheroesContainer.appendChild(tableRow);
    });

    // Add your custom CSS styles
    const customStyles = `
        /* Add your provided CSS styles here */
        .card {
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
            max-width: 300px;
            margin: auto;
            font-size: 10px;
            text-align: center;
        }
        
        .card button {
            border: none;
            outline: 0;
            padding: 12px;
            color: crimson;
            border-color: black;
            background-color: #ffffff;
            text-align: center;
            cursor: pointer;
            width: 100%;
            font-size: 18px;
        }
        .card button:hover {
            opacity: 0.7;
        }
        .card:hover {
            transform: scale(1.05);
        }
        table, th, tr {
            border: 1px solid white;
            padding: 15px;
        }
        
    `;

    const styleElement = document.createElement('style');
    styleElement.textContent = customStyles;

    // Append the style element to the document's head
    document.head.appendChild(styleElement);
}





// Initialize the Superhero Hunter page
function init() {
    const searchInput = document.getElementById('searchInput');

    // Handle search input changes
    searchInput.addEventListener('input', () => {
        const searchQuery = searchInput.value.trim();
        fetchSuperheroes(searchQuery);
    });

    // Initial fetch to load superheroes (without a search query)
    fetchSuperheroes();

    
}

// Call the initialization function
init();


//Favorite.js

// Fetch superheroes and display them in the UI
function fetchAndDisplaySuperheroes(searchQuery) {
    // Fetch superheroes using API or any data source
    const superheroes = []; // Replace this with your fetched data

    // superheroes in the UI
    const superheroesContainer = document.getElementById('superheroes');
    superheroesContainer.innerHTML = '';
    superheroes.forEach(superhero => {
        // Create superhero card and display details
        const card = createSuperheroCard(superhero);
        superheroesContainer.appendChild(card);
    });
}

// Function to create a superhero card with favorite button
function createSuperheroCard(superhero) {
    const card = document.createElement('div');
    card.classList.add('card', 'custom-card', 'mb-3');

    const img = document.createElement('img');
    img.src = superhero.thumbnail; // Superhero thumbnail URL
    img.classList.add('card-img-top');

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const nameHeading = document.createElement('h5');
    nameHeading.classList.add('card-title');
    nameHeading.textContent = superhero.name; // Superhero name

    const favoriteButton = document.createElement('button');
    favoriteButton.classList.add('btn', 'btn-primary');
    favoriteButton.textContent = 'Add to Favorites';
    favoriteButton.addEventListener('click', function() {
        addToFavorites(superhero);
        favoriteButton.disabled = true; // Disable the button after adding to favorites
    });

    cardBody.appendChild(nameHeading);
    cardBody.appendChild(favoriteButton);
    card.appendChild(img);
    card.appendChild(cardBody);
    return card;
}

// Function to add superhero to favorites
function addToFavorites(superhero) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Check if the superhero is not already in favorites
    if (!favorites.some(fav => fav.id === superhero.id)) {
        favorites.push(superhero);
        localStorage.setItem('favorites', JSON.stringify(favorites));

        alert(`${superhero.name} added to favorites!`);
    } else {
        alert(`${superhero.name} is already in favorites!`);
    }
}

// Fetch and display superheroes on page load
document.addEventListener('DOMContentLoaded', function() {
    fetchAndDisplaySuperheroes();
});

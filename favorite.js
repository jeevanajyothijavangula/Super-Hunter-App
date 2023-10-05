// Listen for the DOMContentLoaded event to ensure the document is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get the element where the favorites will be displayed
    const favoritesList = document.getElementById('favoritesList');

    // Retrieve favorites from local storage, if any; initialize as an empty array if none
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Iterate through each favorite superhero and create a card for them
    favorites.forEach(superhero => {
        const card = createSuperheroCard(superhero);
        favoritesList.appendChild(card);
    });
});

// Function to create a superhero card for displaying favorites
function createSuperheroCard(superhero) {
    // Create a div element for the card and apply CSS styles
    const card = document.createElement('div');
    card.classList.add('card', 'custom-card', 'mb-3', 'mx-3');
    card.style.boxShadow = '0 4px 8px 0 rgba(0, 0, 0, 0.2)';
    card.style.maxWidth = '300px';
    card.style.margin = '10px';
    card.style.fontSize = '16px';
    card.style.textAlign = 'center';
    card.style.transition = 'transform 0.3s ease';

    // Create an image element for the superhero's thumbnail
    const img = document.createElement('img');
    img.src = `${superhero.thumbnail.path}.${superhero.thumbnail.extension}`;
    img.style.width = '100%';

    // Create a div element for the card's body
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    // Create an <h5> element for the superhero's name
    const nameHeading = document.createElement('h5');
    nameHeading.classList.add('card-title');
    nameHeading.textContent = superhero.name;

    // Create a button to remove the superhero from favorites
    const removeButton = document.createElement('button');
    removeButton.classList.add('btn', 'btn-danger', 'my-2');
    removeButton.textContent = 'Remove from Favorites';
    removeButton.style.backgroundColor = 'crimson';
    removeButton.style.border = 'none';

    // Add an event listener to remove the superhero from favorites and remove the card from display
    removeButton.addEventListener('click', function() {
        removeFromFavorites(superhero);
        card.remove();
    });

    // Add event listeners to change the button's background color on hover
    removeButton.addEventListener('mouseenter', function() {
        removeButton.style.backgroundColor = 'darkred';
    });

    removeButton.addEventListener('mouseleave', function() {
        removeButton.style.backgroundColor = 'crimson';
    });

    // Append elements to the card
    cardBody.appendChild(nameHeading);
    cardBody.appendChild(removeButton);
    card.appendChild(img);
    card.appendChild(cardBody);

    // Add custom CSS for card hover effect
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .card:hover {
            transform: scale(1.05);
        }
    `;

    // Append the style element to the document's head
    document.head.appendChild(styleElement);

    return card;
}

// Function to add a superhero to favorites
function addToFavorites(superhero) {
    // Retrieve current favorites from local storage, or initialize as an empty array
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Check if the superhero is not already in favorites
    if (!favorites.some(fav => fav.id === superhero.id)) {
        // Add the superhero to favorites with id, name, and thumbnail
        favorites.push({
            id: superhero.id,
            name: superhero.name,
            thumbnail: superhero.thumbnail
        });

        // Update the favorites in local storage
        localStorage.setItem('favorites', JSON.stringify(favorites));

        // Show an alert confirming the addition
        alert(`${superhero.name} added to favorites!`);
    } else {
        // Show an alert if the superhero is already in favorites
        alert('Superhero is already in favorites!');
    }
}

// Function to remove a superhero from favorites
function removeFromFavorites(superhero) {
    // Retrieve current favorites from local storage, or initialize as an empty array
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Filter out the superhero to be removed and update the favorites
    const updatedFavorites = favorites.filter(fav => fav.id !== superhero.id);

    // Update the favorites in local storage
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

    // Show an alert confirming the removal
    alert(`${superhero.name} removed from favorites!`);
}

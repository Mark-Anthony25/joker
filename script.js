// API URL for JokeAPI
const API_URL = 'https://v2.jokeapi.dev/joke/Any?safe-mode';

// DOM elements
const generateBtn = document.getElementById('generateBtn');
const jokeType = document.getElementById('jokeType');
const jokeContent = document.getElementById('jokeContent');
const loader = document.getElementById('loader');

// Function to fetch and display a joke
async function getJoke() {
    try {
        // Disable button and show loader
        generateBtn.disabled = true;
        loader.classList.add('active');
        jokeType.textContent = 'Loading...';
        jokeContent.textContent = 'Fetching a joke for you...';
        
        // Fetch joke from API
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error('Failed to fetch joke');
        }
        
        const data = await response.json();
        
        // Display the joke type
        jokeType.textContent = data.category || 'Joke';
        
        // Check if it's a two-part joke or a single joke
        if (data.type === 'twopart') {
            jokeContent.textContent = `${data.setup}\n\n${data.delivery}`;
        } else {
            jokeContent.textContent = data.joke;
        }
        
    } catch (error) {
        console.error('Error fetching joke:', error);
        jokeType.textContent = 'Error';
        jokeContent.textContent = 'Oops! Failed to fetch a joke. Please try again.';
    } finally {
        // Re-enable button and hide loader
        generateBtn.disabled = false;
        loader.classList.remove('active');
    }
}

// Event listener for the generate button
generateBtn.addEventListener('click', getJoke);

// Load a joke when the page loads
window.addEventListener('load', getJoke);

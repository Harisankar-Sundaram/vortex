const API_URL = 'https://jsonplaceholder.typicode.com/posts'; 

async function fetchDestinations() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const spaceDestinations = data.slice(0, 5).map((item, index) => {  
            return {
                id: index + 1,
                name: `Galactic Destination ${index + 1}`,
                imageUrl: 'https://via.placeholder.com/300x200',
                description: `Explore the wonders of ${item.title}. This destination offers breathtaking views and unique experiences.`,
                distance: `${Math.floor(Math.random() * 100)} light years`,
                travelTime: `${Math.floor(Math.random() * 10)} years`
            };
        });

        displayDestinations(spaceDestinations);
    } catch (error) {
        console.error('Error fetching destination data:', error);
        displayError('Failed to load destinations. Please try again later.');
    }
}

function displayDestinations(destinations) {
    const carousel = document.getElementById('destination-carousel');
    carousel.innerHTML = '';

    if (destinations.length === 0) {
        displayError('No destinations found.');
        return;
    }

    destinations.forEach(destination => {
        const destinationElement = document.createElement('div');
        destinationElement.classList.add('destination');

        destinationElement.innerHTML = `
            <img src="${destination.imageUrl}" alt="${destination.name}">
            <h3>${destination.name}</h3>
            <p>${destination.description}</p>
            <p><strong>Distance:</strong> ${destination.distance}</p>
            <p><strong>Travel Time:</strong> ${destination.travelTime}</p>
        `;
        carousel.appendChild(destinationElement);
    });
}

function displayError(message) {
    const carousel = document.getElementById('destination-carousel');
    carousel.innerHTML = `<div class="error-message">${message}</div>`;
}

window.onload = fetchDestinations;

import axios from 'axios';

export async function getCoordinates(address, apiKey) {
    const url = `https://geocode.search.hereapi.com/v1/geocode?q=${encodeURIComponent(address)}&apiKey=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.items && response.data.items.length > 0) {
            const position = response.data.items[0].position;
            return { lat: position.lat, lng: position.lng };
        } else {
            console.error('No coordinates found for location:', address);
            return null;
        }
    } catch (error) {
        console.error('Error fetching coordinates:', error);
        return null;
    }
}
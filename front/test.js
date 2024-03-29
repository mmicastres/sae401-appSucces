const axios = require('axios');

async function fetchURLs() {
    const baseURL = 'https://api.succes.kiliangui.fr/api/jeux/';
    const totalURLs = 100000;

    for (let i = 1; i <= totalURLs; i++) {
        const url = `${baseURL}${i}`;
        try {
            await axios.get(url);
            console.log(`Fetched ${url}`);
        } catch (error) {
            console.error(`Error fetching ${url}: ${error.message}`);
        }
    }

    console.log('All URLs fetched successfully.');
}

fetchURLs();



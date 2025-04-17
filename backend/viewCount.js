import axios from 'axios';
const API_KEY = process.env.VIEWCOUNT_API_KEY;



export const updateViewCount = async (boardId) => {
    if (!boardId) {
        console.error("No board ID provided");
        return;
    }

    const options = {
        method: 'GET',
        url: 'https://counter10.p.rapidapi.com/',
        params: {
            IDV: boardId // Each board ID acts as a unique counter
        },
        headers: {
            'x-rapidapi-key': API_KEY,
            'x-rapidapi-host': 'counter10.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        return response.data; // Returns updated view count
    } catch (error) {
        console.error("Error updating view count:", error);
        return null;
    }
}

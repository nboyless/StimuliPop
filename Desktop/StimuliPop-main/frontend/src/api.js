const API_URL = "/api";

export const popBubble = async () => {
    const response = await fetch(`${API_URL}/pop`, {
        method: 'POST',
        credentials: 'include'
    });
    return await response.json();
};

export const getScore = async () => {
    const response = await fetch(`${API_URL}/score`, {
        method: 'GET',
        credentials: 'include'
    });
    return await response.json();
};

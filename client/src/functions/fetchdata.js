async function PostAPIResponse(baseURL, data) {
    const response = await fetch(baseURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response;
}

async function getAPIResponse(baseURL) {
    const response = await fetch(baseURL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response;
}

module.exports = { PostAPIResponse, getAPIResponse };
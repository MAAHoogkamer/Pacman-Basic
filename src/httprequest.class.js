export default class HttpRequest {
    constructor() {
    }
    async postScore(link, name, points) {
        try {
            const response = await fetch(link, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    points: points
                })
            });
            console.log('Score has been posted!', response);
        } catch (err) {
            console.error(`Error: ${err}`);
        }
    }
    async getJson() {
        const response = await fetch('http://localhost:8080/scores/top20');
        const data = await response.json();
        return data;
    }
}
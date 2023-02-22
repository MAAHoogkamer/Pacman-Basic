export default class HttpRequest {
    constructor() {
    }
    async postScoreReturningPlayer(name, points) {
        try {
            const response = await fetch('http://localhost:8080/scores/returningplayer/', {
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

    async postScoreNewPlayer(name, points) {
        try {
            const response = await fetch('http://localhost:8080/scores/newplayer/', {
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
}
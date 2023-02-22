export default class HttpRequest {
    constructor() {
    }
    async postScoreReturningPlayer(name, points) {
        try {
            const response = await fetch('localhost:8080/returningplayer/', {
                method: 'post',
                body: {
                    "name": name,
                    "points": points
                }
            });
            console.log('Score has been posted!', response);
        } catch (err) {
            console.error(`Error: ${err}`);
        }
    }
    async postScoreNewPlayer(name, points) {
        try {
            const response = await fetch('localhost:8080/newplayer/', {
                method: 'post',
                body: {
                    "name": name,
                    "points": points
                }
            });
            console.log('Score has been posted!', response);
        } catch (err) {
            console.error(`Error: ${err}`);
        }
    }
}
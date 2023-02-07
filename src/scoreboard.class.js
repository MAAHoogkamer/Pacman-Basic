export default class ScoreBoard {
    constructor(gameStatus) {
        this.gameStatus = gameStatus;
        this.scoreCanvas = document.getElementById('scoreCanvas');
        this.CTX = this.scoreCanvas.getContext('2d');

        this.playerNameForm = document.getElementById('playerNameForm');
        this.playerNameForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const playerNameInput = document.getElementById('playerName');
            const playerName = playerNameInput.value;
            // Here will be the HTTP Name POST request:
            console.log(`Player name: ${playerName}`);
            // After POST, hide the input field and show the Top 10:
            this.drawScoreTop10();
        });
    }

    drawScoreTop10() {
        document.getElementById('playerNameForm').style.display= "none";
        this.CTX.fillStyle = '#FFFFFF';
        this.CTX.font = "25px Verdana";
        /* HTTP GET request will go here
        const SCORES = this will be the result of the HTTP request
        for (let index = 0; index < scoresArray.length; index++) {
            const element = scoresArray[index];
            const x = 310;
            const y = 30 + i * 35;
            this.CTX.fillText(element, x, y);
        }
        */
        const SCORES = "Bob, 1230";
        this.CTX.fillText(SCORES, 310, 30);
    }
}

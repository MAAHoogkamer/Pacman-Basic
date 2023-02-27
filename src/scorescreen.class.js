export default class ScoreScreen {
    constructor(gameStatus, HTTPREQUEST) {
        this.gameStatus = gameStatus;
        this.httpRequest = HTTPREQUEST;
        this.scoreScreen = document.getElementById('scoreScreen');
        this.scoreCanvas = document.getElementById('scoreCanvas');
        this.CTX = this.scoreCanvas.getContext('2d');
        this.enterPlayerName = document.getElementById('enterPlayerName');
        this.enterPlayerName.addEventListener('submit', (event) => {
            event.preventDefault();
            this.submitPlayerName();
        });
    }
    showEnterPlayerName(){
        this.addButton("Play again?", this.btnPlayAgain,this.scoreScreen.width/2-50, 430);
    }

    async drawScoreTop10() {
        document.getElementById('enterPlayerName').style.display = "none";
        document.getElementById('scoreCanvas').style.display = "block";
        await this.getAndDisplayScores(); // 'await' so new score is included
        this.addButton("Play again?", this.btnPlayAgain, this.scoreCanvas.width / 2 - 50, 430);
    }
    // Getting and drawing the scores got it's own method so the new score is included:
    async getAndDisplayScores() {
        const scores = await this.httpRequest.getTop10();
        this.CTX.fillStyle = '#FFFFFF';
        this.CTX.font = "20px Verdana";
        scores.forEach((score, index) => {
            const text = `${index + 1}. ${score.playerId}: ${score.points}`;
            this.CTX.fillText(text, 270, 130 + index * 20);
        });
    }

    // Reusable function for creating a button on the canvas:
    addButton(btnText, btnClickHandler, x, y) {
        const btnElem = document.createElement('button');
        btnElem.innerText = btnText;
        btnElem.classList.add("button");
        btnElem.setAttribute("id", btnText);
        btnElem.style.position = 'absolute';
        btnElem.style.left = x + 'px';
        btnElem.style.top = y + 'px';
        btnElem.addEventListener('click', btnClickHandler.bind(this));
        btnElem.addEventListener('touch', btnClickHandler.bind(this));
        document.body.appendChild(btnElem);
        return btnElem;
        /* For removing a button:
        let button = document.getElementById("Butonnusadk");
        button.parentNode.removeChild(button);
        */
    }
    btnPlayAgain() {
        sessionStorage.setItem('savedLives', 3);
        sessionStorage.setItem('savedDifficulty', 1);
        sessionStorage.setItem('savedPoints', 0);
        location.reload();
    }

    submitPlayerName() {
        const playerNameInput = document.getElementById('playerName');
        const playerName = playerNameInput.value;
        const link = 'http://localhost:8080/scores/playerandscore/';
        this.httpRequest.postScore(link, playerName, this.gameStatus.points);
        this.drawScoreTop10();
    }
}
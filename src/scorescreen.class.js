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

    drawScoreTop10() {
        document.getElementById('enterPlayerName').style.display= "none";
        document.getElementById('scoreCanvas').style.display= "block";
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
        this.CTX.fillText(SCORES, 270, 130);
        this.addButton("Play again?", this.btnPlayAgain,this.scoreCanvas.width/2-50, 430);
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
        const returningPlayerChecked = document.getElementById("returningPlayer").checked;
        const newPlayerChecked = document.getElementById("newPlayer").checked;
        if (returningPlayerChecked) {
            this.httpRequest.postScoreReturningPlayer();
            // Make endpoint in score /returningplayer/?
            // Look up the playerId corresponding to the name getPlayerIdByName()
            // Post score using this playerId
        } else if (newPlayerChecked) {
            this.httpRequest.postScoreNewPlayer();
            // Make endpoint in player /newplayer/?
            // create new player using the name, return the new id
            // Post score using this playerId
        }
        console.log(`Player name: ${playerName}®`);
        // After POST, hide the input field and show the Top 10:
        this.drawScoreTop10();
    }
}
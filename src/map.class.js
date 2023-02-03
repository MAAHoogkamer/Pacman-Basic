export default class Map {
    constructor(gameStatus, rows) {
        this.rows = rows;
        this.gameStatus = gameStatus;
        this.OFFSET_X = 11;
        this.OFFSET_Y = 15;
        this.PILL_WIDTH = 13.5;
        this.whichUniPic = 0;
        // Get the canvas:
        this.CANVAS = document.getElementById("canvas");
        this.CTX = this.CANVAS.getContext("2d");
        // Load the images:
        this.IMAGES = ['./img/UnicornRight.png', './img/UnicornLeft.png', './img/UnicornDown.png', './img/UnicornUp.png', './img/UnicornRight1.png', './img/UnicornLeft1.png', './img/UnicornDown1.png', './img/UnicornUp1.png', './img/Ghost1.png', './img/Ghost2.png', './img/NewBluePill.png', './img/YellowPill.png'].map((src) => {
            const IMG = new Image();
            IMG.src = src;
            return IMG;
        });
    }
    // Draw the grid:
    drawGrid() {
        if (this.gameStatus.openOrClose === 0) {
            this.whichUniPic = this.gameStatus.unicornDirection;
        } else if (this.gameStatus.openOrClose === 1) {
            this.whichUniPic = this.gameStatus.unicornDirection + 4;
        } else {
            this.whichUniPic = 0;
            console.log(this.whichUniPic);
        }
        this.CTX.clearRect(0, 0, 720, 540);
        this.CTX.fillStyle = '#FCDB00';
        this.CTX.font = "35px Verdana";
        this.CTX.fillText(`Level: ${this.gameStatus.difficulty}   Points: ${this.gameStatus.yellowPillCounter}`, 185, 500);
        this.rows.forEach((row, index) => {
            for (let i = 0; i < row.length; i++) {
                if (row[i] === '1') {
                    this.CTX.drawImage(this.IMAGES[11],i * this.PILL_WIDTH + this.OFFSET_X,(index * this.PILL_WIDTH) + this.OFFSET_Y,6,6);
                }else if (row[i] === '5') {
                    this.CTX.drawImage(this.IMAGES[this.whichUniPic],i * this.PILL_WIDTH + this.OFFSET_X - 4.5,(index * this.PILL_WIDTH) + this.OFFSET_Y - 4.5,17,17);
                }else if (row[i] === '2') {
                    this.CTX.drawImage(this.IMAGES[10],i * this.PILL_WIDTH + this.OFFSET_X - 4.5,(index * this.PILL_WIDTH) + this.OFFSET_Y - 4.5,14,14);
                }else if (row[i] === '6') {
                    this.CTX.drawImage(this.IMAGES[8],i * this.PILL_WIDTH + this.OFFSET_X - 4.5,(index * this.PILL_WIDTH) - 4.5+ this.OFFSET_Y,17,17);
                }else if (row[i] === '7') {
                    this.CTX.drawImage(this.IMAGES[9],i * this.PILL_WIDTH + this.OFFSET_X - 4.5,(index * this.PILL_WIDTH) - 4.5+ this.OFFSET_Y,15,15);
                }
            }
        })
    }
    // Draw amount of lives left:
    livesLeft() {
        const n = this.gameStatus.lives;
        console.log(this.gameStatus.lives);
        for (let i = 0; i < n; i++) {
            const x = 310 + i * 35;
            const y = 430;
            this.drawLives(x, y);
        }
    }
    drawLives(x, y) {
        this.CTX.drawImage(this.IMAGES[0], x, y, 30, 30);
    }
}


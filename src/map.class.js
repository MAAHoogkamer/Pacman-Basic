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
        this.IMAGES = ['./img/UnicornRight.png', './img/UnicornLeft.png', './img/UnicornDown.png', './img/UnicornUp.png', './img/UnicornRight1.png', './img/UnicornLeft1.png', './img/UnicornDown1.png', './img/UnicornUp1.png', './img/Ghost1.png', './img/Ghost2.png', './img/Ghost3.png', './img/Ghost4.png','./img/NewBluePill.png', './img/YellowPill.png'].map((src) => {
            const IMG = new Image();
            IMG.src = src;
            return IMG;
        });
    }
    // Draw the grid:
    drawGrid() {
        if (this.gameStatus.openOrClose === 0) {
            this.whichUniPic = this.gameStatus.unicornDirection;
        } else {
            this.whichUniPic = this.gameStatus.unicornDirection + 4
        }
        this.CTX.clearRect(0, 0, 720, 540);
        this.CTX.fillStyle = '#FCDB00';
        this.CTX.font = "35px Verdana";
        this.CTX.fillText(`Level: ${this.gameStatus.difficulty}   Deaths: ${this.gameStatus.deathCount}`, 170, 500);
        this.rows.forEach((row, index) => {
            for (let i = 0; i < row.length; i++) {
                if (row[i] === '1') {
                    this.CTX.drawImage(this.IMAGES[13],i * this.PILL_WIDTH + this.OFFSET_X,(index * this.PILL_WIDTH) + this.OFFSET_Y,6,6);
                }else if (row[i] === '5') {
                    this.CTX.drawImage(this.IMAGES[this.whichUniPic],i * this.PILL_WIDTH + this.OFFSET_X - 4.5,(index * this.PILL_WIDTH) + this.OFFSET_Y - 4.5,17,17);
                }else if (row[i] === '2') {
                    this.CTX.drawImage(this.IMAGES[12],i * this.PILL_WIDTH + this.OFFSET_X - 4.5,(index * this.PILL_WIDTH) + this.OFFSET_Y - 4.5,14,14);
                }else if (row[i] === '6') {
                    this.CTX.drawImage(this.IMAGES[8],i * this.PILL_WIDTH + this.OFFSET_X - 4.5,(index * this.PILL_WIDTH) - 4.5+ this.OFFSET_Y,17,17);
                }else if (row[i] === '7') {
                    this.CTX.drawImage(this.IMAGES[9],i * this.PILL_WIDTH + this.OFFSET_X - 4.5,(index * this.PILL_WIDTH) - 4.5+ this.OFFSET_Y,15,15);
                }
            }
        })
    }

}


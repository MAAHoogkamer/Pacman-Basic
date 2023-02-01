export default class Character {
    constructor(gameStatus, curPosY, curPosX, lastDir, charNr, rows, moveFunc) {
        this.gameStatus = gameStatus;
        this.currentPositionY = curPosY;
        this.currentPositionX = curPosX;
        this.newField = '3';
        this.lastDirection = lastDir;
        this.characterNr = charNr;
        this.rows = rows;

        if (moveFunc) {
            this.movement = moveFunc.bind(this);
        }
    }

    calculateNewPosition(direction) {
        this.newPositionY = this.currentPositionY;
        this.newPositionX = this.currentPositionX;
        if (direction === 2) {
            this.newPositionY = this.currentPositionY + 1; // Down
        } else if (direction === 3) {
            this.newPositionY = this.currentPositionY - 1; // Up
        } else if (direction === 1) {
            this.newPositionX = this.currentPositionX - 1; // Left
        } else if (direction === 0) {
            this.newPositionX = this.currentPositionX + 1; // Right
        }
    }
    movement(direction) {
        this.calculateNewPosition(direction);
        if (this.rows[this.newPositionY][this.newPositionX] === '1') {
            this.gameStatus.yellowPillCounter++;
        } else if (this.rows[this.newPositionY][this.newPositionX] === '2') {
            this.gameStatus.ghostStatus = 7; // The blue pill
            setTimeout(() => {this.gameStatus.ghostStatus = 6}, 8000);
        }

        if (['1', '2', '3', '4', '7'].includes(this.rows[this.newPositionY][this.newPositionX])) {
            if (this.currentPositionY === 14) { // The tunnel
                if (this.currentPositionX === 50 || this.currentPositionX === 1) {
                    this.newField = '4';
                } else {
                    this.newField = '3';
                }
            }

            if (this.rows[this.newPositionY][this.newPositionX] === '4') {
                let newPositionX;
                if (this.newPositionX === 1) {
                    newPositionX = 50;
                } else {
                    newPositionX = 1;
                }
                this.rows[this.currentPositionY] = this.setCharAt(this.rows[this.currentPositionY], this.currentPositionX, this.newField);
                this.currentPositionY = 14;
                this.currentPositionX = newPositionX;
                this.rows[14] = this.setCharAt(this.rows[14], newPositionX, '5');
                this.rows[14] = this.setCharAt(this.rows[14], newPositionX === 1 ? 50 : 1, '4');
            } else {
                this.rows[this.currentPositionY] = this.setCharAt(this.rows[this.currentPositionY], this.currentPositionX, this.newField);
                this.currentPositionY = this.newPositionY;
                this.currentPositionX = this.newPositionX;
                this.rows[this.newPositionY] = this.setCharAt(this.rows[this.newPositionY], this.newPositionX, this.characterNr);
            }
        }
    }
    setCharAt(str, index, chr) {
        if (index > str.length - 1) return str;
        return str.substring(0, index) + chr + str.substring(index + 1);
    }
}
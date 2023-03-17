export default class Character {
    constructor(gameStatus, curPosY, curPosX, lastDir, charNr, moveFunc) {
        this.gameStatus = gameStatus;
        this.currentPositionY = curPosY;
        this.currentPositionX = curPosX;
        this.newField = '3';
        this.lastDirection = lastDir;
        this.characterNr = charNr;

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
        if (this.gameStatus.showScoreScreen === 0) {
            this.calculateNewPosition(direction);
            if (this.gameStatus.rows[this.newPositionY][this.newPositionX] === '1') {
                this.gameStatus.yellowPillCounter++;
                this.gameStatus.points++;
            } else if (this.gameStatus.rows[this.newPositionY][this.newPositionX] === '2') {
                if (this.gameStatus.ghostStatus === 6) {
                    // Set the end time for the blue pill event
                    this.gameStatus.bluePillEndTime = Date.now() + 8000;
                    this.gameStatus.ghostStatus = 7;
                } else if (this.gameStatus.ghostStatus === 7) {
                    // Add more time to the blue pill event
                    this.gameStatus.bluePillEndTime += 8000;
                }
            } else if (this.gameStatus.rows[this.newPositionY][this.newPositionX] === '7') {
                for (let i = 0; i < this.gameStatus.ghosts.length; i++) {
                    const ghost = this.gameStatus.ghosts[i];
                    if (ghost.currentPositionY === this.newPositionY && ghost.currentPositionX === this.newPositionX) {
                        this.gameStatus.ghosts.splice(i, 1);
                        this.gameStatus.points+=100;
                        break;
                    }
                }
            }
        }

        if (['1', '2', '3', '4', '7'].includes(this.gameStatus.rows[this.newPositionY][this.newPositionX])) {
            if (this.currentPositionY === this.gameStatus.locOf4Right.row ||
                this.currentPositionY === this.gameStatus.locOf4Left.row) {
                if (this.currentPositionX === this.gameStatus.locOf4Right.col ||
                    this.currentPositionX === this.gameStatus.locOf4Left.col) {
                    this.newField = '4';
                } else {
                    this.newField = '3';
                }
            }
            if (this.gameStatus.rows[this.newPositionY][this.newPositionX] === '4') {
                let newPositionX;
                if (this.newPositionX === this.gameStatus.locOf4Left.col) {
                    newPositionX = this.gameStatus.locOf4Right.col;
                } else {
                    newPositionX = this.gameStatus.locOf4Left.col;
                }
                let newPositionY = this.gameStatus.locOf4Left.row;
                if (this.newPositionY === this.gameStatus.locOf4Left.row) {
                    newPositionY = this.gameStatus.locOf4Right.row;
                }
                this.gameStatus.rows[this.currentPositionY] = this.setCharAt(this.gameStatus.rows[this.currentPositionY], this.currentPositionX, this.newField);
                this.gameStatus.rows[newPositionY] = this.setCharAt(this.gameStatus.rows[newPositionY], newPositionX, this.characterNr);
                this.currentPositionY = newPositionY;
                this.currentPositionX = newPositionX;
                this.removeCharAt(this.currentPositionY, this.currentPositionX, '5');
                this.putTunnelBack();
            } else {
                this.gameStatus.rows[this.currentPositionY] = this.setCharAt(this.gameStatus.rows[this.currentPositionY], this.currentPositionX, this.newField);
                this.gameStatus.rows[this.newPositionY] = this.setCharAt(this.gameStatus.rows[this.newPositionY], this.newPositionX, this.characterNr);
                this.currentPositionY = this.newPositionY;
                this.currentPositionX = this.newPositionX;
                this.removeCharAt(this.currentPositionY, this.currentPositionX, '5');
                this.putTunnelBack();
            }

            // Unable to load conversation 4335a680-433d-4fcf-849f-550d91c3f2da

        }
    }
    putTunnelBack() {
        // If there was a tunnel on the previous field, replace it with a 4
        if (this.previousField === '4') {
            this.gameStatus.rows[this.currentPositionY] = this.setCharAt(this.gameStatus.rows[this.currentPositionY], this.currentPositionX, '4');
        }

        // Replace the 5 at the previous position with the original character (or a 4 if it was a tunnel)
        let previousChar = this.gameStatus.rows[this.previousPositionY][this.previousPositionX];
        if (previousChar === '5') {
            if (this.gameStatus.tunnels[this.previousPositionY][this.previousPositionX]) {
                previousChar = '4';
            } else {
                previousChar = this.gameStatus.originalRows[this.previousPositionY][this.previousPositionX];
            }
        }
        this.gameStatus.rows[this.previousPositionY] = this.setCharAt(this.gameStatus.rows[this.previousPositionY], this.previousPositionX, previousChar);
    }

    setCharAt(str, index, chr) {
        if (index > str.length - 1) return str;
        return str.substring(0, index) + chr + str.substring(index + 1);
    }
}
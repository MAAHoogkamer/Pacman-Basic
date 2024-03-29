import Character from "./character.class";

export default class Ghost extends Character {
    constructor(gameStatus, curPosY, curPosX, lastDir, charNr, moveFunc) {
        super(gameStatus, curPosY, curPosX, lastDir, charNr, moveFunc);
        this.gameStatus.ghosts.push(this);
        this.lastTimeDied = 0;
    }

    moveGhost() {
        this.characterNr = this.gameStatus.ghostStatus;
        if (this.gameStatus.rows[this.newPositionY][this.newPositionX] === '0'/* ||
            this.gameStatus.rows[this.newPositionY][this.newPositionX] === '6'*/) {
            this.movement();
        }
        if (this.characterNr === 6 && this.gameStatus.rows[this.newPositionY][this.newPositionX] === '5') {
            // Died more than 5 sec ago?
            if (Date.now() - this.lastTimeDied >= 5000) {
                // Update the timestamp
                this.lastTimeDied = Date.now();
                // Here you die, reloads if lives are more as 0
                this.gameStatus.lives--;
                if (this.gameStatus.lives > 0) {
                    sessionStorage.setItem('savedDifficulty', this.gameStatus.points);
                    sessionStorage.setItem('savedDifficulty', this.gameStatus.difficulty);
                    sessionStorage.setItem('savedLives', this.gameStatus.lives);
                    sessionStorage.setItem('savedPoints', this.gameStatus.points);
                    location.reload();
                }
            }
    } else if (this.characterNr === 7 && this.gameStatus.rows[this.newPositionY][this.newPositionX] === '5') {
            this.movement();
        }
        if (['1', '2', '3'].includes(this.gameStatus.rows[this.newPositionY][this.newPositionX])) {
            this.gameStatus.rows[this.currentPositionY] = this.setCharAt(this.gameStatus.rows[this.currentPositionY], this.currentPositionX, this.newField);
            if (this.gameStatus.rows[this.newPositionY][this.newPositionX] !== '6') {
                this.newField = this.gameStatus.rows[this.newPositionY][this.newPositionX];
            }
            this.currentPositionY = this.newPositionY;
            this.currentPositionX = this.newPositionX;
            this.gameStatus.rows[this.newPositionY] = this.setCharAt(this.gameStatus.rows[this.newPositionY], this.newPositionX, this.characterNr);
        }
    }

    moveGhostRandom(whichGhost) {
        const MOVE = [0, 1, 2, 3]; // 0: right, 1: left, 2: up, 3: down
        let direction;

        if (whichGhost === 1 && Math.random() < 0.2) {
            direction = this.lastDirection;
        } else if (whichGhost === 2 && Math.random() < 0.5) {
            direction = this.lastDirection;
        } else if (whichGhost === 3 && Math.random() < 0.95) {
            direction = this.lastDirection;
        } else {
            const RANDOM = Math.floor(Math.random() * MOVE.length);
            direction = MOVE[RANDOM];
        }

        if (this.characterNr === 7) {
            if (direction === 0 && this.currentPositionX + 3 < this.gameStatus.rows[0].length && (this.gameStatus.rows[this.currentPositionY][this.currentPositionX + 2] === '5' || this.gameStatus.rows[this.currentPositionY][this.currentPositionX + 3] === '5')) {
                direction = 1; // Change direction to left
            } else if (direction === 1 && this.currentPositionX - 3 >= 0 && (this.gameStatus.rows[this.currentPositionY][this.currentPositionX - 2] === '5' || this.gameStatus.rows[this.currentPositionY][this.currentPositionX - 3] === '5')) {
                direction = 0; // Change direction to right
            } else if (direction === 2 && this.currentPositionY + 3 < this.gameStatus.rows.length && (this.gameStatus.rows[this.currentPositionY + 2][this.currentPositionX] === '5' || this.gameStatus.rows[this.currentPositionY + 3][this.currentPositionX] === '5')) {
                direction = 3; // Change direction to up
            } else if (direction === 3 && this.currentPositionY - 3 >= 0 && (this.gameStatus.rows[this.currentPositionY - 2][this.currentPositionX] === '5' || this.gameStatus.rows[this.currentPositionY - 3][this.currentPositionX] === '5')) {
                direction = 2; // Change direction to down
            }
        }

        this.lastDirection = direction;
        this.calculateNewPosition(direction);
        this.moveGhost(whichGhost);
    }

}
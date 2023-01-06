import Character from "./character.class";

export default class Ghost extends Character {
    constructor(gameStatus, curPosY, curPosX, lastDir, charNr, rows, moveFunc) {
        super(gameStatus, curPosY, curPosX, lastDir, charNr, rows, moveFunc);
        this.gameStatus.ghosts.push(this);
    }

    moveGhost() {
        this.characterNr = this.gameStatus.ghostStatus;
        if (this.rows[this.newPositionY][this.newPositionX] === '0') {
            this.movement();
        }
        if (this.characterNr === 6 && this.rows[this.newPositionY][this.newPositionX] === '5') {
            this.gameStatus.deathCount++;
            sessionStorage.setItem('savedDifficulty', this.gameStatus.difficulty);
            sessionStorage.setItem('savedDeaths', this.gameStatus.deathCount);
            location.reload();
        } else if (this.characterNr === 7 && this.rows[this.newPositionY][this.newPositionX] === '5') {
            this.movement();
        }
        if (['1', '2', '3'].includes(this.rows[this.newPositionY][this.newPositionX])) {
            this.rows[this.currentPositionY] = this.setCharAt(this.rows[this.currentPositionY], this.currentPositionX, this.newField);
            if (this.rows[this.newPositionY][this.newPositionX] !== '6') {
                this.newField = this.rows[this.newPositionY][this.newPositionX];
            }
            this.currentPositionY = this.newPositionY;
            this.currentPositionX = this.newPositionX;
            this.rows[this.newPositionY] = this.setCharAt(this.rows[this.newPositionY], this.newPositionX, this.characterNr);
        }
    }

    moveGhostRandom(whichGhost) {
        const MOVE = [0, 1, 2, 3]; // 0: right, 1: left, 2: up, 3: down
        let direction;

        if (whichGhost === 1 && Math.random() < 0.2) {
            direction = this.lastDirection;
        } else if (whichGhost === 2 && Math.random() < 0.5) {
            direction = this.lastDirection;
        } else if (whichGhost === 3 && Math.random() < 0.9) {
            direction = this.lastDirection;
        } else {
            const RANDOM = Math.floor(Math.random() * MOVE.length);
            direction = MOVE[RANDOM];
        }

        this.calculateNewPosition(direction);
        //const newPositionX = this.newPositionX;
        //const newPositionY = this.newPositionY;

        if (this.characterNr === 7 ) {
            if (direction === 0 && this.currentPositionX + 2 < this.rows[0].length && (this.rows[this.currentPositionY][this.currentPositionX + 1] === '5' || this.rows[this.currentPositionY][this.currentPositionX + 2] === '5')) {
                direction = 1; // Change direction to left
                console.log('go left');
            } else if (direction === 1 && this.currentPositionX - 2 >= 0 && (this.rows[this.currentPositionY][this.currentPositionX - 1] === '5' || this.rows[this.currentPositionY][this.currentPositionX - 2] === '5')) {
                direction = 0; // Change direction to right
                console.log('go right');
            } else if (direction === 2 && this.currentPositionY + 2 < this.rows.length && (this.rows[this.currentPositionY + 1][this.currentPositionX] === '5' || this.rows[this.currentPositionY + 2][this.currentPositionX] === '5')) {
                direction = 3; // Change direction to up
                console.log('go up');
            } else if (direction === 3 && this.currentPositionY - 2 >= 0 && (this.rows[this.currentPositionY - 1][this.currentPositionX] === '5' || this.rows[this.currentPositionY - 2][this.currentPositionX] === '5')) {
                direction = 2; // Change direction to down
                console.log('go down');
            }
        }

        this.lastDirection = direction;
        this.calculateNewPosition(direction);
        this.moveGhost(whichGhost);
    }

}
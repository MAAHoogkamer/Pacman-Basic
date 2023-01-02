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
            console.log(this.gameStatus.deathCount);
        } else if (this.characterNr === 7 && this.rows[this.newPositionY][this.newPositionX] === '5') {
            const index = this.gameStatus.ghosts.indexOf(this);
            if (index > -1) {
                this.gameStatus.ghosts.splice(index, 1);
            }
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
        const MOVE = [0, 1, 2, 3];
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

        this.lastDirection = direction;
        this.calculateNewPosition(direction);
        this.moveGhost(whichGhost);
    }

}
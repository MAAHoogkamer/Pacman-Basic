import Character from "./character.class";

export default class Ghost extends Character {
    constructor(curPosY, curPosX, newField, lastDir, charNr, rows, moveFunc) {
        super(curPosY, curPosX, newField, lastDir, charNr, rows, moveFunc);
        this.lastDirection;
        this.countLastDirection;
    }

    moveGhost() {
        if (this.rows[this.newPositionY][this.newPositionX] === '0') {
            this.movement();
        }
        if (['1', '2', '3'].includes(this.rows[this.newPositionY][this.newPositionX])) {
            //const eats = this.rows[newPositionY][newPositionX];
            //whatHappens(eats);
            this.rows[this.currentPositionY] = this.setCharAt(this.rows[this.currentPositionY], this.currentPositionX, this.newField);
            if (this.characterNr !== 5 && this.rows[this.newPositionY][this.newPositionX] !== '6') {
                this.newField = this.rows[this.newPositionY][this.newPositionX];
            }
            //console.log(this.newPositionY + this.newPositionX);
            this.currentPositionY = this.newPositionY;
            this.currentPositionX = this.newPositionX;
            this.rows[this.newPositionY] = this.setCharAt(this.rows[this.newPositionY], this.newPositionX, this.characterNr);
        }
    }

    moveGhostRandom(whichGhost) {
        const MOVE = ['left', 'down', 'up', 'right'];
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
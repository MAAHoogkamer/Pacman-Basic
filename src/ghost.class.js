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
        const RANDOM = Math.floor(Math.random() * MOVE.length);
        let direction = MOVE[RANDOM];
        if (whichGhost === 2 && Math.random() < 0.8) {
            direction = this.lastDirection;
        }
        this.lastDirection = direction;
        this.calculateNewPosition(direction);
        this.moveGhost();
    }
}
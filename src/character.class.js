export default class Character {
    constructor(curPosY, curPosX, newField, lastDir, charNr, rows, moveFunc) {
        this.currentPositionY = curPosY;
        this.currentPositionX = curPosX;
        this.newField = newField;
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
        if (direction === 'down') {
            this.newPositionY = this.currentPositionY + 1;
        } else if (direction === 'up') {
            this.newPositionY = this.currentPositionY - 1;
        } else if (direction === 'left') {
            this.newPositionX = this.currentPositionX - 1;
        } else if (direction === 'right') {
            this.newPositionX = this.currentPositionX + 1;
        }
    }

    movement(direction) {
        this.calculateNewPosition(direction);

        if (['1', '2', '3', '6', '7'].includes(this.rows[this.newPositionY][this.newPositionX])) {
            //const eats = this.rows[newPositionY][newPositionX];
            //whatHappens(eats);
            //console.log(this.newField);
            this.rows[this.currentPositionY] = this.setCharAt(this.rows[this.currentPositionY], this.currentPositionX, this.newField);
            if (this.characterNr !== 5 && this.rows[this.newPositionY][this.newPositionX] !== '6') {
                this.newField = this.rows[this.newPositionY][this.newPositionX];
            }
            this.currentPositionY = this.newPositionY;
            this.currentPositionX = this.newPositionX;
            //console.log(this.newField);
            //console.log(this);
            this.rows[this.newPositionY] = this.setCharAt(this.rows[this.newPositionY], this.newPositionX, this.characterNr);
        }
    }
    setCharAt(str, index, chr) {
        if (index > str.length - 1) return str;
        return str.substring(0, index) + chr + str.substring(index + 1);
    }
}
export default class Character {
    constructor(curPosY, curPosX, newField, lastDir, charNr) {
        this.currentPositionY = curPosY;
        this.currentPositionX = curPosX;
        this.newField = newField;
        this.lastDirection = lastDir;
        this.characterNr = charNr;
    }
    movement(direction, rows) {
        let newPositionY = this.currentPositionY;
        let newPositionX = this.currentPositionX;
        if (direction === 'down') {
            newPositionY = this.currentPositionY + 1;
        } else if (direction === 'up') {
            newPositionY = this.currentPositionY - 1;
        } else if (direction === 'left') {
            newPositionX = this.currentPositionX - 1;
        } else if (direction === 'right') {
            newPositionX = this.currentPositionX + 1;
        }

        if (['1', '2', '3', '6', '7'].includes(rows[newPositionY][newPositionX])) {
            //const eats = rows[newPositionY][newPositionX];
            //whatHappens(eats);
            //console.log(this.newField);
            rows[this.currentPositionY] = this.setCharAt(rows[this.currentPositionY], this.currentPositionX, this.newField);
            if (this.characterNr !== 5 && rows[newPositionY][newPositionX] !== '6') {
                this.newField = rows[newPositionY][newPositionX];
            }
            this.currentPositionY = newPositionY;
            this.currentPositionX = newPositionX;
            //console.log(this.newField);
            //console.log(this);
            rows[newPositionY] = this.setCharAt(rows[newPositionY], newPositionX, this.characterNr);
        }
    }
    setCharAt(str, index, chr) {
        if (index > str.length - 1) return str;
        return str.substring(0, index) + chr + str.substring(index + 1);
    }
}
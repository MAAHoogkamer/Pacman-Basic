export default class Character {
    constructor(counters, curPosY, curPosX, lastDir, charNr, rows, moveFunc) {
        this.counters = counters;
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
        if (this.rows[this.newPositionY][this.newPositionX] === '1') {
            this.counters.yellowPillCounter++;
            console.log(this.counters.yellowPillCounter);
        } else if (this.rows[this.newPositionY][this.newPositionX] === '2') {
            console.log('Blue Pill');
            console.log(this.rows);
        }

        if (['1', '2', '3', '4'].includes(this.rows[this.newPositionY][this.newPositionX])) {
            if (this.currentPositionX === 50) {
                this.newField = '4';
            } else {
                this.newField = '3';
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
import Character from "./character.class";

export default class Ghost extends Character {
    movement(direction) {
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

        if (['1', '2', '3'].includes(this.rows[newPositionY][newPositionX])) {
            //const eats = this.rows[newPositionY][newPositionX];
            //whatHappens(eats);
            //console.log(this.newField);
            this.rows[this.currentPositionY] = this.setCharAt(this.rows[this.currentPositionY], this.currentPositionX, this.newField);
            if (this.rows[newPositionY][newPositionX] !== '6') {
                this.newField = this.rows[newPositionY][newPositionX];
            }
            this.currentPositionY = newPositionY;
            this.currentPositionX = newPositionX;
            //console.log(this.newField);
            //console.log(this);
            this.rows[newPositionY] = this.setCharAt(this.rows[newPositionY], newPositionX, this.characterNr);
        }
        if (['6', '7'].includes(this.rows[newPositionY][newPositionX])) {

        }
    }
    setCharAt(str, index, chr) {
        if (index > str.length - 1) return str;
        return str.substring(0, index) + chr + str.substring(index + 1);
    }
}
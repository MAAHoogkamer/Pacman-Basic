import Character from "./character.class";

export default class Ghost extends Character {
    moveGhost() {
        if (['1', '2', '3', '6', '7'].includes(this.rows[this.newPositionY][this.newPositionX])) {
            //const eats = this.rows[newPositionY][newPositionX];
            //whatHappens(eats);
            this.rows[this.currentPositionY] = this.setCharAt(this.rows[this.currentPositionY], this.currentPositionX, this.newField);
            if (this.characterNr !== 5 && this.rows[this.newPositionY][this.newPositionX] !== '6') {
                this.newField = this.rows[this.newPositionY][this.newPositionX];
            }
            console.log(this.newPositionY + this.newPositionX);
            this.currentPositionY = this.newPositionY;
            this.currentPositionX = this.newPositionX;
            this.rows[this.newPositionY] = this.setCharAt(this.rows[this.newPositionY], this.newPositionX, this.characterNr);
        }
    }
}
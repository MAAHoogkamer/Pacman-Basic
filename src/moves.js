export function move1() {
    const MOVE = ['left', 'down', 'up', 'right'];
    const RANDOM = Math.floor(Math.random() * MOVE.length);
    let direction = MOVE[RANDOM];
    //if (moveGhost === lastMoveGhost.whichGhost) {
    //  moveGhost = MOVE[RANDOM];
    //}
    //lastMoveGhost.whichGhost = moveGhost;
    //console.log(direction);
    this.calculateNewPosition(direction);
    for(let i=0;i<20;i++) {
        //console.log(i);
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

export function move2() {
    const MOVE = ['left', 'down', 'up', 'right'];
    const RANDOM = Math.floor(Math.random() * MOVE.length);
    let direction = MOVE[RANDOM];
    //if (moveGhost === lastMoveGhost.whichGhost) {
    //  moveGhost = MOVE[RANDOM];
    //}
    //lastMoveGhost.whichGhost = moveGhost;
    //console.log(direction);
    this.calculateNewPosition(direction);
    for(let i=0;i<20;i++) {
        //console.log(i);
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

export function move3(direction) {
    /*
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
    */
}
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
        this.moveGhost();
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
    this.moveGhost();
}

export function move3() {
    const MOVE = ['left', 'down', 'up', 'right'];
    const RANDOM = Math.floor(Math.random() * MOVE.length);
    let direction = MOVE[RANDOM];
    //if (moveGhost === lastMoveGhost.whichGhost) {
    //  moveGhost = MOVE[RANDOM];
    //}
    //lastMoveGhost.whichGhost = moveGhost;
    //console.log(direction);
    this.calculateNewPosition(direction);
    this.moveGhost();
}
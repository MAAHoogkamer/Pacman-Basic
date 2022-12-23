export function move1() {
    for(let i=0;i<1;i++) {
        this.moveGhostRandom(1);
    }
}

export function move2() {
    this.moveGhostRandom(2);
    console.log(this.lastDirection);
}

export function move3() {
    this.moveGhostRandom(3);
}
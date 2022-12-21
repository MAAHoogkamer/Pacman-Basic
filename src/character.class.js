export default class Character {
    constructor(curPosY, curPosX, newField) {
        this.currentPositionY = curPosY;
        this.currentPositionX = curPosX;
        this.newField = newField;
    }

}

class Pacman extends Character {
    constructor()
}

class Ghost extends Character {

}
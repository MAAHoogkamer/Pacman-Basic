export default class Character {
    constructor(curPosY, curPosX, newField, lastDir, charNr) {
        this.currentPositionY = curPosY;
        this.currentPositionX = curPosX;
        this.newField = newField;
        this.lastDirection = lastDir;
        this.characterNr = charNr;
    }

}
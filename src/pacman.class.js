import Character from './character.class.js';
export default class Pacman extends Character {
    constructor(counters, curPosY, curPosX, newField, lastDir, charNr, rows, moveFunc) {
        super(counters, curPosY, curPosX, newField, lastDir, charNr, rows, moveFunc);
        // Pacman controls:
        document.onkeydown = ((e) => {
            let direction;
            switch(e.code) {
                case 'ArrowLeft':
                case 'KeyA':
                    direction = 'left';
                    break;
                case 'ArrowDown':
                case 'KeyS':
                    direction = 'down';
                    break;
                case 'ArrowUp':
                case 'KeyW':
                    direction = 'up';
                    break;
                case 'ArrowRight':
                case 'KeyD':
                    direction = 'right';
                    break;
                //default:
                //
            }
            this.movement(direction, rows);
        });
    }
}
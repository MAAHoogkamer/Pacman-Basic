import Character from './character.class.js';
export default class Pacman extends Character {
    constructor(gameStatus, curPosY, curPosX, lastDir, charNr, rows, moveFunc) {
        super(gameStatus, curPosY, curPosX, lastDir, charNr, rows, moveFunc);
        // Pacman controls:
        document.onkeydown = ((e) => {
            let direction;
            console.log(e.code);
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
                case 'Enter':
                    console.log(rows);
                    break;
                //default:
                //
            }
            this.movement(direction, rows);
        });
    }
}
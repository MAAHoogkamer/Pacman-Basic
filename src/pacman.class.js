import Character from './character.class.js';
export default class Pacman extends Character {
    constructor(gameStatus, curPosY, curPosX, lastDir, charNr, rows, moveFunc) {
        super(gameStatus, curPosY, curPosX, lastDir, charNr, rows, moveFunc);
        // Pacman controls:
        document.onkeydown = ((e) => {
            let direction;
            switch(e.code) {
                case 'ArrowLeft':
                case 'KeyA':
                    direction = 1;
                    break;
                case 'ArrowDown':
                case 'KeyS':
                    direction = 2;
                    break;
                case 'ArrowUp':
                case 'KeyW':
                    direction = 3;
                    break;
                case 'ArrowRight':
                case 'KeyD':
                    direction = 0;
                    break;
                case 'Enter':
                    console.log(rows);
                    break;
                //default:
                //
            }
            if (gameStatus.openOrClose === 0) {
                gameStatus.openOrClose = 1;
            } else {
                gameStatus.openOrClose = 0;
            }
            gameStatus.unicornDirection = direction;
            this.movement(direction, rows);
        });
    }
}
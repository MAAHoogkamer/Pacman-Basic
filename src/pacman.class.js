import Character from './character.class.js';
export default class Pacman extends Character {
    constructor(gameStatus, curPosY, curPosX, lastDir, charNr, moveFunc) {
        super(gameStatus, curPosY, curPosX, lastDir, charNr, moveFunc);
        // Communicorn controls:
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
                    console.log(this.gameStatus.locOf3);
                    break;
                default:
                    return;
            }
            if (this.gameStatus.openOrClose === 0) {
                this.gameStatus.openOrClose = 1;
            } else {
                this.gameStatus.openOrClose = 0;
            }
            this.gameStatus.unicornDirection = direction;
            this.movement(direction);

        });
    }
}
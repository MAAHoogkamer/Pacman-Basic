import Character from './character.class.js';
import TouchControls from "./touchcontrols.class";
export default class Pacman extends Character {
    constructor(gameStatus, curPosY, curPosX, lastDir, charNr, rows, moveFunc) {
        super(gameStatus, curPosY, curPosX, lastDir, charNr, rows, moveFunc);
        //this.gameStatus.pacman.push(this);
        // Load the touch controls:
        const TOUCHTRACKER = new TouchControls("canvas", this, rows);
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
                    /*
                    console.log(this.gameStatus.ghosts);
                    break;
                     */
                default:
                    return;
            }
            if (this.gameStatus.openOrClose === 0) {
                this.gameStatus.openOrClose = 1;
            } else {
                this.gameStatus.openOrClose = 0;
            }
            this.gameStatus.unicornDirection = direction;
            this.movement(direction, rows);

        });
    }
}
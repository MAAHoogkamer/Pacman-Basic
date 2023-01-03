import Pacman from "./pacman.class";
import Ghost from "./ghost.class";
import {move1, move2, move3} from "./moves";

export default class Game {
    constructor(gameStatus, rows, GAME) {
        this.rows = rows;
        this.gameStatus = gameStatus;
        // Create the characters:
        const pacman = new Pacman(gameStatus, 1,1,null, 5, rows, null, GAME);
        // Unleash the ghosts:
        for (let i = -1; i < this.gameStatus.difficulty; i++) {
            this.addExtraGhost();
        }
    }

    getGhosts() {
        let ghosts = [];
        for (let i = 0; i < this.gameStatus.ghosts.length; i++) {
            ghosts.push(eval(this.gameStatus.ghosts[i]));
        }
        return ghosts;
    }

    moveGhosts() {
        let ghosts = this.getGhosts();
        ghosts.forEach((ghost) => ghost.movement());
    }

    addExtraGhost() {
        const ghostSelect = Math.floor(Math.random() * 3);
        let ghost;
        switch (ghostSelect) {
            case 0:
                ghost = new Ghost(this.gameStatus, 12, 26, null, 6, this.rows, move1);
                break;
            case 1:
                ghost = new Ghost(this.gameStatus, 13, 26, null, 6, this.rows, move2);
                break;
            case 2:
                ghost = new Ghost(this.gameStatus, 14, 26, null, 6, this.rows, move3);
                break;
            default:
                ghost = null;
                break;
        }
        // Generate a random string
        const randomString = 'Ghost' + Math.floor(Math.random() * 10000);
        // Add the ghost to an object using the random string as the key
        this.gameStatus.ghosts[randomString] = ghost;
    }

    checkGameState() {
        if (this.gameStatus.yellowPillCounter === 575) {
            this.nextLevel();
        }
        if (this.gameStatus.ghosts.length < 1) {
            this.nextLevel();
        }
    }

    nextLevel() {
        this.gameStatus.difficulty++;
        sessionStorage.setItem('savedDeaths', this.gameStatus.deathCount);
        sessionStorage.setItem('savedDifficulty', this.gameStatus.difficulty);
        location.reload();
    }

}


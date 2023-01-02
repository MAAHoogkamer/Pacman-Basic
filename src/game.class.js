import Pacman from "./pacman.class";
import Ghost from "./ghost.class";
import {move1, move2, move3} from "./moves";

export default class Game {
    constructor(gameStatus, rows, GAME) {
        this.rows = rows;
        this.gameStatus = gameStatus;
        this.amountOfGhosts = this.gameStatus.difficulty + 2;
        // Create the characters:
        const pacman = new Pacman(gameStatus, 1,1,null, 5, rows, null, GAME);
        // Unleash the ghosts:
        for (let i = 0; i < this.amountOfGhosts; i++) {
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

    loadGrid() {
        const FILE = new XMLHttpRequest();
        FILE.open('GET', '/GridDef.txt', false);
        FILE.onreadystatechange = function ()
        {
            if(FILE.readyState === 4 && (FILE.status === 200 || FILE.status === 0))
            {
                this.rows = FILE.responseText.split('\n');
            }
        }
        FILE.send(null);
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

}


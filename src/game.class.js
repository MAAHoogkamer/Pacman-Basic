import Pacman from "./pacman.class";
import Ghost from "./ghost.class";
import {move1, move2, move3} from "./moves";

export default class Game {
    constructor(gameStatus, rows) {
        this.rows = rows;
        this.gameStatus = gameStatus;
        // Create the characters:
        let pacman = new Pacman(gameStatus, 1,1,null, 5, rows, null);
        // Unleash the ghosts:
        const GHOST1 = new Ghost(gameStatus, 12,26,null, 6, rows, move1);
        const GHOST2 = new Ghost(gameStatus, 13,26,null, 6, rows, move2);
        const GHOST3 = new Ghost(gameStatus, 14,26,null, 6, rows, move3);
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
        console.log('ttt');
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

}


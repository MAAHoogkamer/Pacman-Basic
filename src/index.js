import Map from './map.class.js';
import Ghost from './ghost.class.js'
import Pacman from './pacman.class.js'
import {move1, move2, move3} from './moves.js'
// Draw the grid:

// Game status:
let gameStatus = {
    deathCount: 0,
    yellowPillCounter: 0, // 575 is total
    ghostStatus: 6, // 6: red, 7: blue
    ghosts: [],
    unicornDirection: 0, // 0: right, 1: left, 2: up, 3: down
};

// Load the GridDef.txt file:
let rows;
const FILE = new XMLHttpRequest();
FILE.open('GET', '/GridDef.txt', false);
FILE.onreadystatechange = function ()
{
    if(FILE.readyState === 4 && (FILE.status === 200 || FILE.status === 0))
    {
        rows = FILE.responseText.split('\n');
    }
}
FILE.send(null);

// Load the map:
const MAP = new Map(rows, gameStatus);

// Draw the grid:
window.setInterval(() => {
    MAP.drawGrid();
}, 40);

// Create the characters:
let pacman = new Pacman(gameStatus, 1,1,null, 5, rows, null);

// Unleash the ghosts:
const GHOST1 = new Ghost(gameStatus, 12,26,null, 6, rows, move1);
const GHOST2 = new Ghost(gameStatus, 13,26,null, 6, rows, move2);
const GHOST3 = new Ghost(gameStatus, 14,26,null, 6, rows, move3);

function getGhosts() {
    let ghosts = [];
    for (let i = 0; i < gameStatus.ghosts.length; i++) {
        ghosts.push(eval(gameStatus.ghosts[i]));
    }
    return ghosts;
}

window.setInterval(() => {
    let ghosts = getGhosts();
    ghosts.forEach((ghost) => ghost.movement());
}, 100);

/**
 * Map elements to grid
 *
 * 0 border
 * 1 yellow pills
 * 2 blue pills
 * 3 no pills
 * 4 tunnel
 * 5 pacman
 * 6 red ghosts
 * 7 blue ghosts
 *
 */

function addExtraGhost() {
    const ghostIndex = Math.floor(Math.random() * 3);
    let ghost;
    switch (ghostIndex) {
        case 0:
            ghost = new Ghost(GHOST1);
            break;
        case 1:
            ghost = new Ghost(GHOST2);
            break;
        case 2:
            ghost = new Ghost(GHOST3);
            break;
        default:
            ghost = null;
            break;
    }
    // Generate a random string
    const randomString = 'Ghost' + Math.floor(Math.random() * 10000);
    // Use the eval function to create a new variable with the random string as the name
    eval(randomString + ' = ghost');
}
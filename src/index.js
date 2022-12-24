//import Character from './character.class.js';
import Ghost from './ghost.class.js'
import Pacman from './pacman.class.js'
import {move1, move2, move3} from './moves.js'
// Draw the grid:
const OFFSET_X = 11;
const OFFSET_Y = 15;
const PILL_WIDTH = 13.5;
// Game status:
const gameStatus = {
    deathCount: 0,
    yellowPillCounter: 0, // 575 is total
    ghostStatus: 6, // 6: red, 7: blue
    ghosts: [],
};

// Load the images:
const IMAGES = ['./img/PacManB1s.png', './img/PacManB2s.png', './img/PacManL1s.png', './img/PacManL2s.png', './img/PacManR1s.png', './img/PacManR2s.png', './img/PacManT1s.png', './img/PacManT2s.png','./img/Ghost1.png', './img/Ghost2.png', './img/Ghost3.png', './img/Ghost4.png','./img/NewBluePill.png', './img/YellowPill.png'].map((src) => {
    const IMG = new Image();
    IMG.src = src;
    return IMG;
});

// Get the canvas:
const CANVAS = document.getElementById("canvas");
const CTX = CANVAS.getContext("2d");

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

// Draw the grid:
function drawGrid() {
    CTX.clearRect(0, 0, 720, 540);
    rows.forEach((row, index) => {
        for (let i = 0; i < row.length; i++) {
            if (row[i] === '1') {
                CTX.drawImage(IMAGES[13],i * PILL_WIDTH + OFFSET_X,(index * PILL_WIDTH) + OFFSET_Y,6,6);
            }else if (row[i] === '5') {
                CTX.drawImage(IMAGES[0],i * PILL_WIDTH + OFFSET_X - 4.5,(index * PILL_WIDTH) + OFFSET_Y - 4.5,15,15);
            }else if (row[i] === '2') {
                CTX.drawImage(IMAGES[12],i * PILL_WIDTH + OFFSET_X - 4.5,(index * PILL_WIDTH) + OFFSET_Y - 4.5,14,14);
            }else if (row[i] === '6') {
                CTX.drawImage(IMAGES[8],i * PILL_WIDTH + OFFSET_X - 4.5,(index * PILL_WIDTH) - 4.5+ OFFSET_Y,18,18);
            }else if (row[i] === '7') {
                CTX.drawImage(IMAGES[9],i * PILL_WIDTH + OFFSET_X - 4.5,(index * PILL_WIDTH) - 4.5+ OFFSET_Y,18,18);
            }
        }
    })
}
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

setInterval(() => {
    let ghosts = getGhosts();
    ghosts.forEach((ghost) => ghost.movement());
}, 100);

window.setInterval(() => {
    drawGrid();
}, 40);

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


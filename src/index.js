import Character from './character.class.js';
//import Ghost from './ghost.class.js'
// Draw the grid:
const OFFSET_X = 11;
const OFFSET_Y = 15;
const PILL_WIDTH = 13.5;
// Current positions of moving elements:
/*
let pacmanX = 1;
let pacmanY = 1;
let ghostX = 26;
let ghostY = 12;
let ghost1X = 26;
let ghost1Y = 13;
let ghost2X = 26;
let ghost2Y = 14;
// Counters:
let yPillCount = 0;
let deathCount = 0;
// deathCounter needs to be stored in super global
*/

// Load the images:
const IMAGES = ['./img/PacManB1s.png', './img/PacManB2s.png', './img/PacManL1s.png', './img/PacManL2s.png', './img/PacManR1s.png', './img/PacManR2s.png', './img/PacManT1s.png', './img/PacManT2s.png','./img/Ghost1.png', './img/Ghost2.png', './img/Ghost3.png', './img/Ghost4.png','./img/BluePill.png', './img/YellowPill.png'].map((src) => {
    const IMG = new Image();
    IMG.src = src;
    return IMG;
});

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
                CTX.drawImage(IMAGES[12],i * PILL_WIDTH + OFFSET_X,(index * PILL_WIDTH) + OFFSET_Y,6,6);
            }else if (row[i] === '6') {
                CTX.drawImage(IMAGES[8],i * PILL_WIDTH + OFFSET_X - 4.5,(index * PILL_WIDTH) - 4.5+ OFFSET_Y,18,18);
            }
        }
    })
}
// Create the characters:
let pacman = new Character(1,1,3,null, 5);
// Pacman controls:
document.onkeydown = ((e) => {
    console.log(e.code);
    let movePac;
    switch(e.code) {
        case 'ArrowLeft':
        case 'KeyA':
            movePac = 'left';
            break;
        case 'ArrowDown':
        case 'KeyS':
            movePac = 'down';
            break;
        case 'ArrowUp':
        case 'KeyW':
            movePac = 'up';
            break;
        case 'ArrowRight':
        case 'KeyD':
            movePac = 'right';
            break;
        //default:
        //
    }
    pacman.movement(movePac, rows);
});
/*
// Ghost movement:
let ghost = new Character(12,26,3,null, 6);
let ghost1 = new Character(13,26,3,null, 6);
let ghost2 = new Character(14,26,3,null, 6);
const GHOSTS = [ghost, ghost1, ghost2];
unleashGhosts();
function unleashGhosts() {
    GHOSTS.forEach(moveGhost);
    //moveGhost(ghost);
    setTimeout(unleashGhosts, 100);
}

function moveGhost(whichGhost) {
    const MOVE = ['left', 'down', 'up', 'right'];
    const RANDOM = Math.floor(Math.random() * MOVE.length);
    let moveGhost = MOVE[RANDOM];
    //if (moveGhost === lastMoveGhost.whichGhost) {
      //  moveGhost = MOVE[RANDOM];
    //}
    //lastMoveGhost.whichGhost = moveGhost;
    movement(moveGhost, whichGhost);
}

    function whatHappens(x) {
        switch (x) {
            case '1':
                // yPillCount++;
                break;
            case '2':
                // Blue pill event
                break;
            case '6':
                // Red ghost: pacman dies
                //location.reload();
                //deathCount++;
                break;
            case '7':
                // Blue pill event, eat blue ghosts
                break;
            //default:
            //
        }
    }
*/
window.setInterval(() => {
    drawGrid();
}, 40);

//unleashGhosts();
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
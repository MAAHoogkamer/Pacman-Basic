// Draw the grid:
const OFFSET_X = 11;
const OFFSET_Y = 15;
const PILL_WIDTH = 13.5;
// Current positions of moving elements:
let pacmanX = 1;
let pacmanY = 1;
let ghostX = 26;
let ghostY = 12;
// Counters:
let yPillCount = 0;
let deathCount = 0;
// deathCounter needs to be stored in super global

const IMAGES = ['./img/PacManB1s.png', './img/BluePill.png', './img/YellowPill.png', './img/Ghost1.png'].map((src) => {
    const IMG = new Image();
    IMG.src = src;
    return IMG;
});

const CANVAS = document.getElementById("canvas");
const CTX = CANVAS.getContext("2d");

window.setTimeout(() => {
    //CTX.drawImage(IMAGES[0],100,100);
    //CTX.drawImage(IMAGES[1],200,200,24,24);
    //CTX.drawImage(IMAGES[2],300,300,24,24);
    drawGrid();
    //setTimeout(moveGhost, 100);
}, 50);

// Load the GridDef.txt file:
let rows;
const FILE = new XMLHttpRequest();
FILE.open('GET', '/src/GridDef.txt', false);
FILE.onreadystatechange = function ()
{
    if(FILE.readyState === 4 && (FILE.status === 200 || FILE.status === 0))
    {
        rows = FILE.responseText.split('\n');
    }
}
FILE.send(null);

function drawGrid() {
    rows.forEach((row, index) => {
        for (let i = 0; i < row.length; i++) {
            if (row[i] === '1') {
                CTX.drawImage(IMAGES[2],i * PILL_WIDTH + OFFSET_X,(index * PILL_WIDTH) + OFFSET_Y,6,6);
            }else if (row[i] === '5') {
                CTX.drawImage(IMAGES[0],i * PILL_WIDTH + OFFSET_X - 4.5,(index * PILL_WIDTH) + OFFSET_Y - 4.5,15,15);
            }else if (row[i] === '2') {
                CTX.drawImage(IMAGES[1],i * PILL_WIDTH + OFFSET_X,(index * PILL_WIDTH) + OFFSET_Y,6,6);
            }else if (row[i] === '6') {
            CTX.drawImage(IMAGES[3],i * PILL_WIDTH + OFFSET_X - 4.5,(index * PILL_WIDTH) - 4.5+ OFFSET_Y,18,18);
        }
        }
    })
}
// Pacman controls:
document.onkeydown = ((e) => {
    let movePac;
    switch(e.code) {
        case 'KeyA':
            movePac = 'left';
            break;
        case 'KeyS':
            movePac = 'down';
            break;
        case 'KeyW':
            movePac = 'up';
            break;
        case 'KeyD':
            movePac = 'right';
            break;
        //default:
        //
    }
    movement(movePac, 'pacman');
});
// Ghost movement:
let previousMove = null;

function moveGhost() {
    const MOVE = ['left', 'down', 'up', 'right'];
    let moveGhost = null;
    while (moveGhost === previousMove) {
        const RANDOM = Math.floor(Math.random() * MOVE.length);
        moveGhost = MOVE[RANDOM];
    }
    previousMove = moveGhost;
    movement(moveGhost, 'ghost');
}

// Movement function:
let newFieldNumber = '3';
function movement(direction, character) {
    let newObjectNumber;
    let currentPositionY;
    let currentPositionX;

    if (character === 'pacman') {
        currentPositionY = pacmanY;
        currentPositionX = pacmanX;
        newObjectNumber = '5';
    } else if (character === 'ghost') {
        currentPositionY = ghostY;
        currentPositionX = ghostX;
        newObjectNumber = '6';
    }

    let newPositionY = currentPositionY;
    let newPositionX = currentPositionX;
    if (direction === 'down') {
        newPositionY = currentPositionY + 1;
    } else if (direction === 'up') {
        newPositionY = currentPositionY - 1;
    } else if (direction === 'left') {
        newPositionX = currentPositionX - 1;
    } else if (direction === 'right') {
        newPositionX = currentPositionX + 1;
    }

    if (['1', '2', '3', '6', '7'].includes(rows[newPositionY][newPositionX])) {
        const eats = rows[newPositionY][newPositionX];
        whatHappens(eats);
        if (character === 'pacman') {
            pacmanY = newPositionY;
            pacmanX = newPositionX;
            newFieldNumber = '3';
        } else if (character === 'ghost') {
            ghostY = newPositionY;
            ghostX = newPositionX;
        }
        rows[currentPositionY] = setCharAt(rows[currentPositionY], currentPositionX, newFieldNumber);
        newFieldNumber = rows[newPositionY][newPositionX];
        rows[newPositionY] = setCharAt(rows[newPositionY], newPositionX, newObjectNumber);
        CTX.clearRect(0, 0, 720, 540);
        drawGrid();
    }

    if (character === 'ghost') {
        setTimeout(moveGhost, 100);
    }
}


function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}
function whatHappens(x) {
    switch(x) {
        case '1':
            yPillCount++;
            break;
        case '2':
            // Blue pill event
            break;
        case '6':
            // Red ghost: pacman dies
            location.reload();
            deathCount++;
            break;
        case '7':
            // Blue pill event, eat blue ghosts
            break;
        //default:
        //
    }
}


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
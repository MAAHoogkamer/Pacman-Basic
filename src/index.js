// Draw the grid:
const OFFSET_X = 11;
const OFFSET_Y = 15;
const PILL_WIDTH = 13.5;
// Current positions of moving elements:
let pacmanX = 1;
let pacmanY = 1;
let ghostX = 26;
let ghostY = 13;

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
/*
document.onkeydown = ((e) => {
    console.log(e.code);
    if (e.code === 'KeyS' || e.code === 'KeyW') {
        if (['1', '2', '3'].indexOf(rows[pacmanY + (e.code ===  'KeyW' ? -1 : 1)][pacmanX]) !== -1) {
            rows[pacmanY] = setCharAt(rows[pacmanY], pacmanX, '3');
            rows[pacmanY + (e.code === 'KeyW' ? -1 : 1)] = setCharAt(rows[pacmanY + (e.code === 'KeyW' ? -1 : 1)], pacmanX, '5');
            pacmanY = pacmanY + (e.code === 'KeyW' ? -1 : +1);
            CTX.clearRect(0, 0, 720, 540);
            drawGrid();
        }
    }
    if (e.code === 'KeyA' || e.code === 'KeyD') {
        if (['1', '2', '3'].indexOf(rows[pacmanY][pacmanX + (e.code === 'KeyA' ? -1 : 1)]) !== -1) {
            rows[pacmanY] = setCharAt(rows[pacmanY], pacmanX, '3');
            rows[pacmanY] = setCharAt(rows[pacmanY], pacmanX + (e.code === 'KeyA' ? -1 : 1), '5');
            pacmanX = pacmanX + (e.code === 'KeyA' ? -1 : +1);
            CTX.clearRect(0, 0, 720, 540);
            drawGrid();
        }
    }
});
*/
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
    console.log(movePac);
    movement(movePac, 'pacman');
});
// Ghost movement:
function moveGhost() {
    const MOVE = ['left', 'down', 'up', 'right'];
    const RANDOM = Math.floor(Math.random() * MOVE.length);
    let moveGhost = MOVE[RANDOM];
    //console.log(moveGhost);
    movement(moveGhost, 'ghost');
}
// Game object movement:
function movement(e,x) {
    console.log(e);
    let posY;
    let posX;
    let newNr;
    switch(x) {
        case 'pacman':
            posY = pacmanY;
            posX = pacmanX;
            newNr = '5';
            break;
        case 'ghost':
            posY = ghostY;
            posX = ghostX;
            newNr = '6';
            break;
    }
    if (e === 'down' || e === 'up') {
        if (['1', '2', '3'].indexOf(rows[posY + (e ===  'up' ? -1 : 1)][posX]) !== -1) {
            rows[posY] = setCharAt(rows[posY], posX, '3');
            rows[posY + (e === 'up' ? -1 : 1)] = setCharAt(rows[posY + (e === 'up' ? -1 : 1)], posX, newNr);
            if (x === 'pacman') {
                pacmanY = posY + (e === 'up' ? -1 : +1);
            }else if (x === 'ghost') {
                ghostY = posY + (e === 'up' ? -1 : +1);
            }
            CTX.clearRect(0, 0, 720, 540);
            drawGrid();
        }
    }
    if (e === 'left' || e === 'right') {
        if (['1', '2', '3'].indexOf(rows[posY][posX + (e === 'left' ? -1 : 1)]) !== -1) {
            rows[posY] = setCharAt(rows[posY], posX, '3');
            rows[posY] = setCharAt(rows[posY], posX + (e === 'left' ? -1 : 1), newNr);
            if (x === 'pacman') {
                pacmanX = posX + (e === 'left' ? -1 : +1);
            }else if (x === 'ghost') {
                ghostX = posX + (e === 'left' ? -1 : +1);
            }
            CTX.clearRect(0, 0, 720, 540);
            drawGrid();
        }
    }
    if (x === 'ghost') {
        setTimeout(moveGhost, 100);
    }
}

function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
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
 * 6 colored ghosts
 * 7 blue ghosts
 *
 */
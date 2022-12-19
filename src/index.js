
const IMAGES = ['./img/PacManB1s.png', './img/Ghost1.png', './img/YellowPill.png'].map((src) => {
    const IMG = new Image();
    IMG.src = src;
    return IMG;
});

const CANVAS = document.getElementById("canvas");
const CTX = CANVAS.getContext("2d");

window.setTimeout(() => {
    CTX.drawImage(IMAGES[0],100,100);
    CTX.drawImage(IMAGES[1],200,200,24,24);
    CTX.drawImage(IMAGES[2],300,300,24,24);
    drawGrid();
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

// Draw the grid:
const OFFSET_X = 11;
const OFFSET_Y = 15;
const PILL_WIDTH = 13.5;
function drawGrid() {
    rows.forEach((row, index) => {
        for (let i = 0; i < row.length; i++) {
            console.log(index);
            if (row[i] === '1') {
                CTX.drawImage(IMAGES[2],i * PILL_WIDTH + OFFSET_X,(index * PILL_WIDTH) + OFFSET_Y,6,6);
            }

        }
    })
}

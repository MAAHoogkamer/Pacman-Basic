import Game from './game.class.js';
import Map from './map.class.js';

// Game status:
let gameStatus = {
    deathCount: 0,
    yellowPillCounter: 0, // 575 is total
    ghostStatus: 6, // 6: red, 7: blue
    ghosts: [],
    unicornDirection: 0, // 0: right, 1: left, 2: up, 3: down
    openOrClose: 0,
    difficulty: 1, // Increments with each level
};
let savedDeaths = sessionStorage.getItem('savedDeaths');
let savedDifficulty = sessionStorage.getItem('savedDifficulty');
if (savedDeaths) {
    //console.log(savedGameStatus);
    gameStatus.deathCount = savedDeaths;
    gameStatus.difficulty = savedDifficulty;
}

console.log(gameStatus.difficulty);

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

// Load the game mechanics:
const GAME = new Game(gameStatus, rows);

// Load the map:
const MAP = new Map(gameStatus, rows);

// Draw the grid:
window.setInterval(() => {
    if (gameStatus.yellowPillCounter === 575) {
        GAME.nextLevel();
    }
    MAP.drawGrid();
}, 40);

// Move the ghosts:
window.setInterval(() => {
    GAME.moveGhosts();
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
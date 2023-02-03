import Game from './game.class.js';
import Map from './map.class.js';

// Game status:
let gameStatus = {
    points: 0,
    lives: 3,
    yellowPillCounter: 0, // 97 is total
    ghostStatus: 6, // 6: bright pink, 7: light pink
    bluePillEndTime: 0,
    ghosts: [], // Ghosts are pushed here, so they can also be removed
    unicornDirection: 0, // 0: right, 1: left, 2: up, 3: down
    openOrClose: 0,
    difficulty: 1, // Increments with each level
};
let savedLives = sessionStorage.getItem('savedLives');
let savedDifficulty = sessionStorage.getItem('savedDifficulty');
let savedPoints = sessionStorage.getItem('savedPoints');
if (savedLives) {
    gameStatus.lives = savedLives;
    gameStatus.difficulty = savedDifficulty;
    gameStatus.points = savedPoints;
}

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
    GAME.checkGameState();
    MAP.drawGrid();
    MAP.livesLeft();
    MAP.drawStatus();
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
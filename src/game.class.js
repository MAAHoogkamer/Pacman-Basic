import Pacman from "./pacman.class";
import Ghost from "./ghost.class";
import {move1, move2, move3} from "./moves";
import TouchControls from "./touchcontrol.class";

export default class Game {
    constructor(gameStatus, SCORESCREEN) {
        this.gameStatus = gameStatus;
        this.ScoreScreen = SCORESCREEN;
        // Create the characters:
        const pacman = new Pacman(gameStatus, this.gameStatus.locOf5.row, this.gameStatus.locOf5.col, null, 5, null);
        // Unleash the Troublemakers
        for (let i = -1; i < this.gameStatus.difficulty; i++) {
            this.addExtraGhost();
        }
        // Load the Touch Controls:
        const TOUCH = new TouchControls("canvas", pacman);
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

    addExtraGhost() {
        const ghostSelect = Math.floor(Math.random() * 3);
        let ghost;
        switch (ghostSelect) {
            case 0:
                ghost = new Ghost(this.gameStatus, 12, 26, null, 6, move1);
                break;
            case 1:
                ghost = new Ghost(this.gameStatus, 13, 26, null, 6, move2);
                break;
            case 2:
                ghost = new Ghost(this.gameStatus, 14, 26, null, 6, move3);
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

    checkGameState() {
        // If lives are gone, score screne will show:
        if (this.gameStatus.lives < 1) {
            this.gameStatus.showScoreScreen = 1;
            //sessionStorage.setItem('savedLives', this.gameStatus.lives);
        }
        // If all yellow pills are eaten -> next level
        if (this.gameStatus.yellowPillCounter === 500) { // Should be 575
            this.nextLevel();
        }
        // If a ghost is eaten, spawn new one after timer ends
        let ghostAmount = (parseInt(this.gameStatus.difficulty) + 2);
        if (this.gameStatus.ghosts.length < ghostAmount && Date.now() >= this.gameStatus.bluePillEndTime) {
            this.addExtraGhost();
        }
        // If current time exceeds blue pill time -> set ghosts back to bright pink
        if (Date.now() >= this.gameStatus.bluePillEndTime) {
            this.gameStatus.ghostStatus = 6;
        }
        // Toggle the ScoreScreen
        if (this.gameStatus.showScoreScreen === 1) {
            document.getElementById('scoreScreen').style.display = 'block';
            //this.ScoreScreen.showEnterPlayerName();
        } else if (this.gameStatus.showScoreScreen === 0) {
            document.getElementById('scoreScreen').style.display = 'none';
        }
    }

    nextLevel() {
        this.gameStatus.points += (this.gameStatus.difficulty * 350);
        this.gameStatus.difficulty++;
        sessionStorage.setItem('savedLives', this.gameStatus.lives);
        sessionStorage.setItem('savedDifficulty', this.gameStatus.difficulty);
        sessionStorage.setItem('savedPoints', this.gameStatus.points);
        location.reload();
    }

}


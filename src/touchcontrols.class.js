export default class TouchControls {
    constructor(canvasId, pacman, rows) {
        this.pacman = pacman;
        this.rows = rows;
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");
        this.initialX = 0;
        this.initialY = 0;
        this.canvas.addEventListener("touchstart", this.handleTouchStart.bind(this), false);
        this.canvas.addEventListener("touchmove", this.handleTouchMove.bind(this), false);
    }

    handleTouchStart(e) {
        e.preventDefault();
        var touch = e.touches[0];
        this.initialX = touch.clientX;
        this.initialY = touch.clientY;
    }

    handleTouchMove(e) {
        e.preventDefault();
        var touch = e.touches[0];
        var currentX = touch.clientX;
        var currentY = touch.clientY;
        var direction;

        if (currentX > this.initialX) {
            direction = 0;
        } else if (currentX < this.initialX) {
            direction = 1;
        }

        if (currentY > this.initialY) {
            direction = 2;
        } else if (currentY < this.initialY) {
            direction = 3;
        }
        this.initialX = currentX;
        this.initialY = currentY;
        this.pacman.movement(direction, this.rows);
    }
}

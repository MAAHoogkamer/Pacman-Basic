export default class TouchControls {
    constructor(canvasId, pacman) {
        this.pacman = pacman;
        this.canvas = document.getElementById(canvasId);
        this.initialX = 0;
        this.initialY = 0;
        this.lastMovementTime = 0;
        this.canvas.addEventListener("touchstart", this.handleTouchStart.bind(this), false);
        this.canvas.addEventListener("touchmove", this.handleTouchMove.bind(this), false);
    }

    handleTouchStart(e) {
        e.preventDefault();
        const touch = e.touches[0];
        this.initialX = touch.clientX;
        this.initialY = touch.clientY;
    }

    handleTouchMove(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const currentX = touch.clientX;
        const currentY = touch.clientY;
        let direction;

        const currentTime = Date.now();
        if (currentTime - this.lastMovementTime < 50) {
            return;
        }
        this.lastMovementTime = currentTime;

        if (currentX > this.initialX) {
            document.dispatchEvent(new KeyboardEvent('keydown', {'code': 'KeyD'}));
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
        this.pacman.movement(direction);
    }
}
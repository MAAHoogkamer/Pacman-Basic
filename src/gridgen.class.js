export default class GridGenerator {
    constructor(gameStatus) {
        this.gameStatus = gameStatus;
    }
    /*
    Be aware. A LOT of this code can and should be refragmented,
    and will be done when I finish the actual backend. <3
    Especially placing stuff on the grid can all be done in a main loop.
     */

    async generateGrid() {
        let grid;
        const numRows = 31;
        const numCols = 52;
        let numberOfWalls;
        let spawnPlaced;

        do {
            grid = [];
            numberOfWalls = 0;
            // Initialize the grid with all '0's
            for (let i = 0; i < numRows; i++) {
                let row = [];
                for (let j = 0; j < numCols; j++) {
                    if (i === 0 || i === numRows - 1 || j === 0 || j === numCols - 1) {
                        row.push('0'); // set border as 0
                    } else if (Math.random() < 0.5) {
                        row.push('3');
                    } else {
                        row.push('0');
                    }
                }
                grid.push(row);
            }
            // Place a 5 on the grid = Communicorn
            let row5, col5;
            do {
                row5 = Math.floor(Math.random() * (numRows - 2)) + 1;
                col5 = Math.floor(Math.random() * 10) + 1;
            } while (grid[row5][col5] !== '3');

            grid[row5][col5] = '5';
            this.gameStatus.locOf5 = {row: row5, col: col5};

            // Make sure every 3 in the grid is part of a pathway
            for (let i = 1; i < numRows - 1; i++) {
                for (let j = 1; j < numCols - 1; j++) {
                    if (grid[i][j] === '0') {
                        let count = 0;
                        if (grid[i - 1][j] === '3') count++;
                        if (grid[i + 1][j] === '3') count++;
                        if (grid[i][j - 1] === '3') count++;
                        if (grid[i][j + 1] === '3') count++;
                        if (count >= 3) {
                            grid[i][j] = '3';
                        } else if (grid[i][j] === '3') {
                            grid[i][j] = '0';
                        }
                    }
                }
            }
            // Check if all 3s are reachable by the player
            const visited = Array(numRows)
                .fill()
                .map(() => Array(numCols).fill(false));
            const queue = [{ row: this.gameStatus.locOf5.row, col: this.gameStatus.locOf5.col }];
            visited[this.gameStatus.locOf5.row][this.gameStatus.locOf5.col] = true;

            while (queue.length > 0) {
                const { row, col } = queue.shift();

                if (grid[row][col] === '3') {
                    visited[row][col] = true;
                }

                if (row > 0 && !visited[row - 1][col] && grid[row - 1][col] !== '0') {
                    visited[row - 1][col] = true;
                    queue.push({ row: row - 1, col });
                }

                if (row < numRows - 1 && !visited[row + 1][col] && grid[row + 1][col] !== '0') {
                    visited[row + 1][col] = true;
                    queue.push({ row: row + 1, col });
                }

                if (col > 0 && !visited[row][col - 1] && grid[row][col - 1] !== '0') {
                    visited[row][col - 1] = true;
                    queue.push({ row, col: col - 1 });
                }

                if (col < numCols - 1 && !visited[row][col + 1] && grid[row][col + 1] !== '0') {
                    visited[row][col + 1] = true;
                    queue.push({ row, col: col + 1 });
                }
            }
            // Replace any unreachable 3s with 0s
            for (let i = 1; i < numRows - 1; i++) {
                for (let j = 1; j < numCols - 1; j++) {
                    if (grid[i][j] === '3' && !visited[i][j]) {
                        grid[i][j] = '0';
                        numberOfWalls++;
                    }
                }
            }
        } while (numberOfWalls > 170);

        // Place a 4 on the left side = Tunnel
        let row4l, col4l;
        do {
            row4l = Math.floor(Math.random() * (numRows - 2)) + 1;
            col4l = Math.floor(Math.random() * 3) + 1;
        } while (grid[row4l][col4l] !== '3');

        grid[row4l][col4l] = '4';
        this.gameStatus.locOf4Left = {row: row4l, col: col4l};

        // Place a 4 on the right side = Tunnel
        let row4r, col4r;
        do {
            row4r = Math.floor(Math.random() * (numRows - 2)) + 1;
            col4r = Math.floor((Math.random() * 3) + 47) + 1;
        } while (grid[row4r][col4r] !== '3');

        grid[row4r][col4r] = '4';
        this.gameStatus.locOf4Right = {row: row4r, col: col4r};

        // Place a 3 as spawn point for enemies, surrounded by at least two 3s
        while (!spawnPlaced) {
            let i = Math.floor(Math.random() * 29) + 1;
            let j = Math.floor(Math.random() * 49) + 1;
            if (grid[i][j] === '3' &&
                ((grid[i - 1][j] === '3' && grid[i + 1][j] === '3') || (grid[i][j - 1] === '3' && grid[i][j + 1] === '3')) &&
                ((grid[i - 1][j - 1] === '3' && grid[i - 1][j + 1] === '3') || (grid[i + 1][j - 1] === '3' && grid[i + 1][j + 1] === '3'))) {
                grid[i][j] = '3';
                this.gameStatus.locOf3 = {row: i, col: j};
                spawnPlaced = true;
            }
        }
        // Time to place pills on the grid
        let numReplacements = this.gameStatus.totalYellowPills
        let replacementsMade = 0
        while (replacementsMade < numReplacements) {
            let row = Math.floor(Math.random() * (numRows - 2)) + 1;
            let col = Math.floor(Math.random() * (numCols - 2)) + 1;
            if (grid[row][col] === 3) {
                grid[row][col] = 1
                replacementsMade++
            }
        }
        // And some blue pills Staffbase logos yea
        let placedBluePills = 0
        while (placedBluePills < (parseInt(this.gameStatus.difficulty) + 1)) {
            let row = Math.floor(Math.random() * (numRows - 2)) + 1;
            let col = Math.floor(Math.random() * (numCols - 2)) + 1;
            if (grid[row][col] === 3) {
                grid[row][col] = 2
                placedBluePills++
            }
        }
        // Convert grid array to string and populate rows
        let gridString = "";
        for (let row of grid) {
            gridString += row.join("") + "\n";
        }
        this.gameStatus.rows = gridString.trim().split("\n");
    }
}
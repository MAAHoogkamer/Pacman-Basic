export default class GridGenerator {
    constructor(gameStatus) {
        this.gameStatus = gameStatus;
    }

    async generateGrid() {
        let grid = [];
        const numRows = 31;
        const numCols = 52;

        for (let i = 0; i < numRows; i++) {
            let row = [];
            for (let j = 0; j < numCols; j++) {
                if (Math.random() < 0.5) {
                    row.push("1");
                } else {
                    row.push("0");
                }
            }
            grid.push(row);
        }

        // Place a 5 on the grid = Communicorn
        let row5 = Math.floor(Math.random() * (numRows - 2)) + 1;
        let col5 = Math.floor(Math.random() * 10) + 1;
        grid[row5][col5] = "5";
        this.gameStatus.locOf5 = {row: row5, col: col5};

        // Place a 4 on the left side = Tunnel
        let row4Left = Math.floor(Math.random() * numRows);
        grid[row4Left][0] = "4";
        this.gameStatus.locOf4Left = {row: row4Left, col: 0};

        // Place a 4 on the right side = Tunnel
        let row4Right = Math.floor(Math.random() * numRows);
        grid[row4Right][numCols - 1] = "4";
        this.gameStatus.locOf4Right = {row: row4Right, col: numCols - 1};

        // Place a 3 as spawn point for enemies, surrounded by at least two 1s
        let i = Math.floor(Math.random() * 29) + 1;
        let j = Math.floor(Math.random() * 49) + 1;
        if (grid[i][j] === "1" &&
            ((grid[i - 1][j] === "1" && grid[i + 1][j] === "1") || (grid[i][j - 1] === "1" && grid[i][j + 1] === "1")) &&
            ((grid[i - 1][j - 1] === "1" && grid[i - 1][j + 1] === "1") || (grid[i + 1][j - 1] === "1" && grid[i + 1][j + 1] === "1"))) {
            grid[i][j] = "3";
            this.gameStatus.locOf3 = {x: j, y: i};
        }

        // Make sure every 1 in the grid is part of a pathway
        for (let i = 1; i < numRows - 1; i++) {
            for (let j = 1; j < numCols - 1; j++) {
                if (grid[i][j] === "0") {
                    let count = 0;
                    if (grid[i - 1][j] === "1") count++;
                    if (grid[i + 1][j] === "1") count++;
                    if (grid[i][j - 1] === "1") count++;
                    if (grid[i][j + 1] === "1") count++;
                    if (count >= 3) grid[i][j] = "1";
                }
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
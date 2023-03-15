let gameStatus = {
    locOf5: null,
    locOf4Left: null,
    locOf4Right: null
};

function generateGrid() {
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

    // Place a "5" on the grid
    let row5 = Math.floor(Math.random() * (numRows - 2)) + 1;
    let col5 = Math.floor(Math.random() * 10) + 1;
    grid[row5][col5] = "5";
    gameStatus.locOf5 = {row: row5, col: col5};

    // Place a "4" on the left side of the grid
    let row4Left = Math.floor(Math.random() * numRows);
    grid[row4Left][0] = "4";
    gameStatus.locOf4Left = {row: row4Left, col: 0};

    // Place a "4" on the right side of the grid
    let row4Right = Math.floor(Math.random() * numRows);
    grid[row4Right][numCols - 1] = "4";
    gameStatus.locOf4Right = {row: row4Right, col: numCols - 1};

    // Make sure every "1" in the grid is part of a pathway
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

    // Connect the two "4"s with a tunnel made of "1"s
    let rowLeft = gameStatus.locOf4Left.row;
    let rowRight = gameStatus.locOf4Right.row;
    let colLeft = gameStatus.locOf4Left.col;
    let colRight = gameStatus.locOf4Right.col;

    while (colLeft <= colRight) {
        grid[rowLeft][colLeft] = "1";
        colLeft++;
    }

    return grid;
}

let grid = generateGrid();
for (let row of grid) {
    console.log(row.join(""));
}

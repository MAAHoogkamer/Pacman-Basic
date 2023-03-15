let gameStatus = {
    locOf5: {}, // Spawnpoint Communicorn
    locOf4Left: {}, // Left tunnel entrance
    locOf4Right: {}, // Right tunnel entrance
    locOf3: {}, // Spawnpoint enemies
};

function generateGrid() {
    let grid = [];

    // Initialize grid with "0"s
    for (let i = 0; i < 31; i++) {
        let row = [];
        for (let j = 0; j < 52; j++) {
            row.push("0");
        }
        grid.push(row);
    }

    // Generate pathways
    for (let i = 1; i < 30; i++) {
        for (let j = 1; j < 51; j++) {
            if (Math.random() < 0.5) {
                grid[i][j] = "1";
            }
        }
    }

    // Place left 4
    let left4Placed = false;
    while (!left4Placed) {
        let i = Math.floor(Math.random() * 31);
        if (grid[i][1] === "1") {
            grid[i][0] = "4";
            gameStatus.locOf4Left = { x: 0, y: i };
            left4Placed = true;
        }
    }

    // Place right 5
    let right4Placed = false;
    while (!right4Placed) {
        let i = Math.floor(Math.random() * 31);
        if (grid[i][50] === "1") {
            grid[i][51] = "5";
            gameStatus.locOf4Right = { x: 51, y: i };
            right4Placed = true;
        }
    }

    // Place middle 3
    let middle3Placed = false;
    while (!middle3Placed) {
        let i = Math.floor(Math.random() * 29) + 1;
        let j = Math.floor(Math.random() * 49) + 1;
        if (grid[i][j] === "1" && grid[i - 1][j] === "1" && grid[i + 1][j] === "1" && grid[i][j - 1] === "1" && grid[i][j + 1] === "1") {
            grid[i][j] = "3";
            gameStatus.locOf3 = { x: j, y: i };
            middle3Placed = true;
        }
    }

    // Make sure every "1" in the grid is part of a pathway
    for (let i = 1; i < 30; i++) {
        for (let j = 1; j < 51; j++) {
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

    return grid;
}

let grid = generateGrid();
for (let row of grid) {
    console.log(row.join(""));
}

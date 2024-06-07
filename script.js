let area = document.getElementById('area');

let grid = [];
let cols = 60;
let rows = 30;

function Init() { // Creates the initial grid for the game
    for (let i = 0; i < rows; i++) {
        grid[i] = [];
        let areaRow = document.createElement('li');
        areaRow.classList.add('row');
        areaRow.id = i;
        area.appendChild(areaRow);
        for (let j = 0; j < cols; j++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            cell.id = j;
            grid[i][j] = Math.floor(Math.random() * 2);
            grid[i][j] == 0 ? 
            cell.classList.add('dead') : 
            cell.classList.add('live');
            areaRow.appendChild(cell);
        }
    }
}

setInterval(refreshGrid(), 500) 

function refreshGrid() {
    area.innerHTML = ''
    for (let i = 0; i < rows; i++) {
        let areaRow = document.createElement('li');
        areaRow.classList.add('row');
        areaRow.id = i;
        area.appendChild(areaRow);
        for (let j = 0; j < cols; j++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            cell.id = j;
            console.log(grid[i][j])
            grid[i][j] == 0 ? 
            cell.classList.add('dead') : 
            cell.classList.add('live');
            areaRow.appendChild(cell);
        }
    }
}

function updateCellStatus(){
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {

            // Get current cell
            let currentCell = grid[i][j]
            let upLeft, upCenter, upRight
            let midLeft, midRight
            let downLeft, downCenter, downRight

            // Check for neighboring cells' status
            // Conditions are added to exclude certain sides of the neighboring cells given the center cell location

            // Center cell is at the first row first column
            if (i > 0 && j > 0) {
                upLeft = grid[i-1][j-1]
            } else {
                upLeft = 0
            }

            // Center cell is at the first row
            if (i > 0) {
                upCenter = grid[i-1][j]
            } else {
                upCenter = 0
            }

            // Center cell is at the first row last column
            if (i > 0 && j > 0) {
                upRight = grid[i-1][j+1]
            } else {
                upRight = 0
            }        

            // Center cell is at the first column
            if (j > 0) { 
                midLeft = grid[i][j-1]
            } else {
                midLeft = 0
            }

            // Center cell is at the last column
            if (j < cols) {
                midRight = grid[i][j+1]
            } else {
                midRight = 0
            }

            // Center cell is at the last row first column
            if (i < rows && j > 0) {
                downLeft = grid[i+1][j-1]
            } else {
                downLeft = 0
            }     

            // Center cell is at the last row
            if (i < rows) {
                downCenter = grid[i+1][j]
            } else {
                downCenter = 0
            }

            // Center cell is at the last row first column
            if (i < rows && j < cols) {
                downRight = grid[i+1][j+1]
            } else {
                downRight = 0
            }      

            // Find live and dead cells around the current cell
            let liveCounter = 0

            upLeft = 1 ? liveCounter++ : ''
            upCenter = 1 ? liveCounter++ : '' 
            upRight = 1 ? liveCounter++ : '' 
            midLeft = 1 ? liveCounter++ : '' 
            midRight = 1 ? liveCounter++ : '' 
            downLeft = 1 ? liveCounter++ : ''
            downCenter = 1 ? liveCounter++ : '' 
            downRight = 1 ? liveCounter++ : '' 

            // Add the game rules

            // Any live cell with fewer than two live neighbors dies, as if by underpopulation.
            if (currentCell == 1 && liveCounter < 2) currentCell = 0

            // Any live cell with two or three live neighbors lives on to the next generation.
            if (currentCell == 1 && (liveCounter > 1 && liveCounter < 4)) currentCell = 1

            // Any live cell with more than three live neighbors dies, as if by overpopulation.
            if (currentCell == 1 && liveCounter > 3) currentCell = 0

            // Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
            if (currentCell == 0 && liveCounter == 3) currentCell = 1
        }
    }
    refreshGrid()
}


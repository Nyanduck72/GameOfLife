let area = document.getElementById('area');

let grid = [];

function Init() {
    let cols = 15;
    let rows = 30;
    for (let i = 0; i < cols; i++) {
        let areaRow = document.createElement('li');
        areaRow.classList.add('row');
        areaRow.id = i;
        area.appendChild(areaRow);
        grid[i] = [];
        for (let j = 0; j < rows; j++) {
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
    console.table(grid);
}
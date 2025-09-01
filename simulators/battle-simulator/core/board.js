const HexCell = require('../utils/HexCell.js');

class Board {
  constructor(rows, columns) {
    this.rows = rows;
    this.columns = columns;
    this.grid = this.createGrid(rows, columns);
  }

  createGrid(rows, columns) {
    const grid = [];
    for (let row = 0; row < rows; row++) {
      const rowArray = [];
      for (let col = 0; col < columns; col++) {
        rowArray.push(new HexCell(row, col));
      }
      grid.push(rowArray);
    }
    return grid;
  }

  isValidPosition(row, column) {
    return row >= 0 && row < this.rows && column >= 0 && column < this.columns;
  }

  placeChampion(champion, row, column) {
    if (!this.isValidPosition(row, column)) {
      throw new Error('Invalid position');
    }

    const cell = this.grid[row][column];

    if (cell.champion) {
      throw new Error('Cell already occupied');
    }

    cell.champion = champion;

    return 'Champion placed';
  }

  removeChampion(row, column) {
    if (!this.isValidPosition(row, column)) {
      throw new Error('Invalid position');
    }

    const cell = this.grid[row][column];

    if (cell.champion === null) {
      throw new Error('No champion to remove');
    }

    cell.champion = null;
  }

  getChampion(row, column) {
    if (!this.isValidPosition(row, column)) {
      return 'Invalid position';
    }
    return this.grid[row][column].champion;
  }

  placeChampions(champions, side) {
    const startRow = side === 'left' ? 0 : Math.floor(this.rows / 2);
    const endRow = side === 'left' ? Math.floor(this.rows / 2) : this.rows;

    let championIndex = 0;
    for (let row = startRow; row < endRow; row++) {
      for (let col = 0; col < this.columns; col++) {
        if (championIndex < champions.length) {
          this.placeChampion(champions[championIndex], row, col);
          championIndex++;
        }
      }
    }
  }

  getChampionPosition(champion) {
    for (let row = 0; row < this.rows; row++) {
      for (let column = 0; column < this.columns; column++) {
        if (this.getChampion(row, column) === champion) {
          return [row, column];
        }
      }
    }
    return 'Champion not found';
  }

  isValidPosition(row, column) {
    return row >= 0 && row < this.rows && column >= 0 && column < this.columns;
  }

  removeChampion(row, column) {
    if (this.isValidPosition(row, column)) {
      this.grid[row][column].champion = null;
      return true;
    }
    return false;
  }

  isThereAChampion(row, column) {
    if (!this.isValidPosition(row, column)) {
      return false;
    }

    return this.grid[row][column].champion !== null;
  }

  getSurroundingChampionsByRadius(champion, radius) {
    const position = this.getChampionPosition(champion);
    const [row, column] = position;

    let cellsAroundChampion = [];
    let surroundingChampions = [];
    let surroundingOpponents = [];
    let surroundingAllies = [];

    // top right/left hex above champion
    cellsAroundChampion.push([row - (radius - 1), column]); // top
    cellsAroundChampion.push([row - (radius - 1), column + 1]); // top right
    cellsAroundChampion.push([row - (radius - 1), column - 1]); // top left

    //left and right hex of champion
    cellsAroundChampion.push([row, column - (radius - 1)]); // left
    cellsAroundChampion.push([row, column + (radius - 1)]); // right

    // bottom right/left hex below champion
    cellsAroundChampion.push([row + (radius - 1), column]); // bottom
    cellsAroundChampion.push([row + (radius - 1), column + 1]); // bottom right
    cellsAroundChampion.push([row + (radius - 1), column - 1]); // bottom left

    const championsInRadius = cellsAroundChampion
      .filter((cell) => this.isThereAChampion(cell[0], cell[1]))
      .map((cell) => this.getChampion(cell[0], cell[1]))
      .filter((champ) => champ !== 'Invalid position' && champ !== null);

    surroundingChampions = [...championsInRadius];

    surroundingChampions.forEach((champ) => {
      if (champ && typeof champ === 'object') {
        if (champ.team === 'player') {
          surroundingAllies.push(champ);
        } else {
          surroundingOpponents.push(champ);
        }
      }
    });

    return { championsInRadius, surroundingOpponents, surroundingAllies };
  }

  displayBoard() {
    console.log('Board:');
    for (let row = 0; row < this.rows; row++) {
      let rowStr = '';
      for (let column = 0; column < this.columns; column++) {
        const cell = this.grid[row][column];
        if (cell.champion) {
          const teamIndicator = cell.champion.team === 'player' ? 'P' : 'O';
          rowStr += `[${cell.champion.name.charAt(0)}${teamIndicator}]`;
        } else {
          rowStr += '[  ]';
        }
      }
      console.log(rowStr);
    }
  }
}

module.exports = Board;

class Board {
  constructor() {
    this.board = this.createBoard();
  }

  createBoard() {
    let table = [];

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        table.push(`${[i, j]}`);
      }
    }

    return table;
  }
}

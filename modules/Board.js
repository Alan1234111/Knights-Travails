import Knight from "./Knight.js";
import Graph from "./Graph.js";

class Board {
  constructor() {
    this.board = this.createBoard();
    this.knight = new Knight();
    this.graph = new Graph(64);

    this.addBoardVertex();

    this.mode = "";
    this.tiles = document.querySelectorAll(".column div");
    this.placeKnightBtn = document.getElementById("place");
    this.randomKnightBtn = document.getElementById("random");
    this.endBtn = document.getElementById("end");
    this.travailBtn = document.getElementById("travail");
    this.clearBtn = document.getElementById("clear");

    this.placeKnightBtn.addEventListener("click", this.placeKnight);
    this.randomKnightBtn.addEventListener("click", this.placeKnightRandom);
    this.endBtn.addEventListener("click", this.placeEndPosition);
    this.travailBtn.addEventListener("click", this.travail);
    this.clearBtn.addEventListener("click", this.clearBoard);

    // this.knightMoves(this.knight.startingPostion, this.knight.endPosition);
  }

  addBoardVertex() {
    // Add vertex then add all Edges on every vertex
    for (let i = 0; i < this.board.length; i++) {
      this.graph.addVertex(this.board[i]);
      let moves = this.possibleMoves(this.board[i]);

      for (let move of moves) {
        this.graph.addEdge(this.board[i], move);
      }
    }
  }

  possibleMoves(board) {
    const allPossibleMoves = [];

    const posArr = board.split(",");
    const x = parseInt(posArr[0]);
    const y = parseInt(posArr[1]);

    if (x - 2 >= 0 && y - 1 >= 0) allPossibleMoves.push(`${[x - 2, y - 1]}`);
    if (x - 1 >= 0 && y - 2 >= 0) allPossibleMoves.push(`${[x - 1, y - 2]}`);
    if (x + 1 <= 7 && y - 2 >= 0) allPossibleMoves.push(`${[x + 1, y - 2]}`);
    if (x + 2 <= 7 && y - 1 >= 0) allPossibleMoves.push(`${[x + 2, y - 1]}`);

    if (x - 2 >= 0 && y + 1 <= 7) allPossibleMoves.push(`${[x - 2, y + 1]}`);
    if (x - 1 >= 0 && y + 2 <= 7) allPossibleMoves.push(`${[x - 1, y + 2]}`);
    if (x + 1 <= 7 && y + 2 <= 7) allPossibleMoves.push(`${[x + 1, y + 2]}`);
    if (x + 2 <= 7 && y + 1 <= 7) allPossibleMoves.push(`${[x + 2, y + 1]}`);

    return allPossibleMoves;
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

  knightMoves(start, end) {
    const paths = [];
    const visited = new Set();
    const queue = [];
    queue.push([start, [start]]);

    while (queue.length > 0) {
      let [current, path] = queue.shift();
      visited.add(current);
      if (current == end) {
        paths.push(path);
      }

      const neighbors = this.graph.AdjList.get(current);
      for (let pos of neighbors) {
        if (!visited.has(pos)) {
          queue.push([pos, [...path, pos]]);
        }
      }
    }
    return paths[0];
  }

  clearBoard = () => {
    this.tiles.forEach((tile) => {
      tile.innerHTML = "";
      tile.classList.remove("active");
      tile.classList.remove("visited");
    });

    this.knight.startingPostion = null;
    this.knight.endPosition = null;
  };

  #clearKnight() {
    this.tiles.forEach((tile) => {
      tile.innerHTML = "";
    });
  }

  #clearEnd() {
    this.tiles.forEach((tile) => {
      tile.classList.remove("active");
    });
  }

  #clearVisited() {
    this.tiles.forEach((tile) => {
      tile.classList.remove("visited");
    });
  }

  placeKnight = () => {
    this.mode = "placeKnight";

    this.tiles.forEach((tile) =>
      tile.addEventListener("click", () => {
        this.renderPositions(tile, tile.dataset.column, tile.dataset.row);
      })
    );
  };

  placeKnightRandom = () => {
    this.mode = "placeRandomKnight";
    const randomRow = Math.floor(Math.random() * 8);
    const randomCol = Math.floor(Math.random() * 8);

    const tile = document.querySelector(`.column div[data-row="${randomRow}"][data-column="${randomCol}"]`);
    this.renderPositions(tile, randomCol, randomRow);
  };

  createKnight(tile) {
    const knight = document.createElement("img");
    knight.src = "img/knight-chess.svg";
    knight.id = "knight";
    tile.appendChild(knight);
  }

  renderPositions(tile, row, column) {
    if (this.mode == "endPosition") {
      this.#clearEnd();
      this.knight.endPosition = `${[row, column]}`;
      tile.classList.add("active");
    } else if (this.mode == "placeKnight") {
      this.#clearKnight();
      this.knight.startingPostion = `${[row, column]}`;
      this.createKnight(tile);
    } else {
      this.#clearKnight();
      this.knight.startingPostion = `${[row, column]}`;
      this.createKnight(tile);
    }
  }

  placeEndPosition = () => {
    this.mode = "endPosition";

    this.tiles.forEach((tile) =>
      tile.addEventListener("click", () => {
        this.renderPositions(tile, tile.dataset.column, tile.dataset.row);
      })
    );
  };

  travail = () => {
    if (this.knight.startingPostion == null || this.knight.endPosition == null) return;
    this.#clearVisited();
    const moves = this.knightMoves(this.knight.startingPostion, this.knight.endPosition);
    let interval = 1000;
    moves.forEach((move, index) => {
      setTimeout(() => {
        const posArr = move.split(",");
        const x = parseInt(posArr[0]);
        const y = parseInt(posArr[1]);

        const tile = document.querySelector(`.column div[data-row="${y}"][data-column="${x}"]`);
        this.#clearKnight();
        this.createKnight(tile);
        tile.classList.add("visited");
      }, index * interval);
    });
  };
}

const board = new Board();

import Knight from "./Knight.js";
import Graph from "./Graph.js";

class Board {
  constructor() {
    this.board = this.createBoard();
    this.knight = new Knight(0, 0, 4, 6);
    this.graph = new Graph(64);

    this.addBoardVertex();
    console.log(this.knight.startingPostion, this.knight.endPosition);
    this.knightMoves(this.knight.startingPostion, this.knight.endPosition);
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
    console.log(table);

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
    console.log(`Fastest Routes from ${start} to ${end}`);
    paths.forEach((element) => console.log(element));
  }
}

const board = new Board();

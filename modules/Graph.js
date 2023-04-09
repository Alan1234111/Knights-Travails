export default class Graph {
  constructor(noOfVerticles) {
    this.noOfVerticles = noOfVerticles;
    this.AdjList = new Map();
  }

  addVertex(v) {
    this.AdjList.set(v, []);
  }

  addEdge(v, w) {
    this.AdjList.get(v).push(w);
  }
}

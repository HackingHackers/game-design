import Map from "./map";

export default class Game {
  map: Map;
  turn: number;

  constructor(map: Map) {
    this.map = map;
    this.turn = 0;
  }
}

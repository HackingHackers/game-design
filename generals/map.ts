import { Player, TileType } from "./types";
import type { Config } from "./types";

function shuffle(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

class Tile {
  readonly type: TileType;
  units: number;
  owner: Player;

  constructor(type = TileType.Empty, units = 0, owner: Player = Player.Empty) {
    this.type = type;
    this.units = units;
    this.owner = owner;
  }
}

export default class Map {
  tiles: Tile[][];
  readonly conf: Config;

  constructor(config: Config) {
    this.conf = config;

    const flattenedMap = [
      ...Array(this.conf.players).fill(TileType.Capital),
      ...Array(this.conf.cities).fill(TileType.City),
      ...Array(this.conf.mountains).fill(TileType.Mountain),
    ];
    flattenedMap.length = this.conf.width * this.conf.height;
    shuffle(flattenedMap);

    let owner = Player.Red;
    this.tiles = [...Array(this.conf.width)].map(() =>
      [...Array(this.conf.height)].map(() => {
        const type = flattenedMap.pop();
        if (type === TileType.Capital) {
          return new Tile(type, 1030, owner++);
        }
        if (type === TileType.City) {
          return new Tile(type, Math.floor(Math.random() * 20) + 30);
        }
        return new Tile(type);
      })
    );
  }
}

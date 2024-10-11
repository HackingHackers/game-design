export enum Player {
  Empty,
  Red,
  Blue,
}

export enum TileType {
  Empty,
  Capital,
  City,
  Mountain,
}

export type Config = {
  width: number;
  height: number;
  players: number;
  cities: number;
  mountains: number;
};

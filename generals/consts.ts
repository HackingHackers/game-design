import { Player, TileType } from "./types";

const DEFAULT_BG = 0xdcdcdc;
const FOW_BG = 0x393939;
const MOVABLE_BG = 0x6c6c6c;

export const TEAM_COLORS: {
  readonly [key in Player]: {
    readonly [key in TileType]?: number;
  };
} = {
  [Player.Empty]: {
    [TileType.Empty]: DEFAULT_BG,
    [TileType.City]: 0x808080,
    [TileType.Mountain]: 0xbbbbbb,
  },
  [Player.Red]: {
    [TileType.Empty]: 0xff0000,
    [TileType.City]: 0xb70000,
    [TileType.Capital]: 0x6f0000,
  },
  [Player.Blue]: {
    [TileType.Empty]: 0x2892ff,
    [TileType.City]: 0x0052b7,
    [TileType.Capital]: 0x00396f,
  },
};

export const TILE_GLYPHS =
  // : {
  //   readonly [key in TileType]: string;
  // }
  {
    [TileType.Empty]: " ",
    [TileType.Capital]: "X",
    [TileType.City]: "C",
    [TileType.Mountain]: "M",
  };

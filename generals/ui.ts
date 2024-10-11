import { TEAM_COLORS, TILE_GLYPHS } from "./consts";
import type Map from "./map";

export function render(PS: any, map: Map) {
  for (let i = 0; i < map.conf.width; i++) {
    for (let j = 0; j < map.conf.height; j++) {
      const tile = map.tiles[i][j];
      PS.color(i, j, TEAM_COLORS[tile.owner][tile.type]);
      if (tile.units > 0) {
        PS.glyph(i, j, tile.units.toString());
      }
    }
  }
}

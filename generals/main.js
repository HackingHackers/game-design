import Map from "./map";
import { render } from "./ui";
import { init } from "./multiplayer";

const config = {
  width: 10,
  height: 10,
  players: 2,
  cities: 1,
  mountains: 21,
};

PS.init = () => {
  // init();
  PS.statusText("Generals");
  PS.gridSize(config.width, config.height);
  PS.gridColor(0x222222);
  PS.statusColor(0xfbfbfb);
  PS.borderColor(PS.ALL, PS.ALL, PS.COLOR_BLACK);
  PS.glyphColor(PS.ALL, PS.ALL, PS.COLOR_WHITE);
  PS.glyphScale(PS.ALL, PS.ALL, 75);

  var map = new Map(config);
  console.log(map);
  render(PS, map);
};

PS.touch = () => {
  PS.statusInput("lol", init);
};

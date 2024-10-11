import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import Map from "./map";
import { render } from "./ui";

const config = {
  width: 10,
  height: 10,
  players: 2,
  cities: 1,
  mountains: 21,
};

const firebaseConfig = {
  apiKey: "AIzaSyB3t2ZPGTvDDyeTwKrhwc8oLfxmqZfv50Y",
  authDomain: "game-design-a5db5.firebaseapp.com",
  projectId: "game-design-a5db5",
  storageBucket: "game-design-a5db5.appspot.com",
  messagingSenderId: "724075777037",
  appId: "1:724075777037:web:5adbb883a3bcb5e2379944",
};

const app = initializeApp(firebaseConfig);

PS.init = () => {
  PS.statusText("Generals");
  PS.gridSize(config.width, config.height);
  PS.gridColor(0x222222);
  PS.statusColor(0xfbfbfb);
  PS.borderColor(PS.ALL, PS.ALL, PS.COLOR_BLACK);
  PS.glyphColor(PS.ALL, PS.ALL, PS.COLOR_WHITE);
  PS.glyphScale(PS.ALL, PS.ALL, 75);
  const auth = getAuth(app);
  const db = getFirestore(app);

  var map = new Map(config);
  console.log(map);
  render(PS, map);
};

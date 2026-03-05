import { Game } from "./core/game.js";

console.log(new Date().toLocaleString());

/* to actually draw on the canvas (screen), we need a drawing context
    this allows us to use drawing methods like fillRect(), drawImage(),
    and stroke() to render graphics on the canvas */
const screen = document.getElementById("screen");
const game = new Game(screen);
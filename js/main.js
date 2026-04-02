import Game from "./core/game.js";

window.addEventListener("load", (event) =>
{
    console.info(`Loading @ ${new Date().toLocaleString()}`);

    /* to actually draw on the canvas (screen), we need a drawing context
        this allows us to use drawing methods like fillRect(), drawImage(),
        and stroke() to render graphics on the canvas */
    const screen = document.getElementById("screen");
    const game = new Game(screen);
    game.initialize();
});

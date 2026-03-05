import { GAME_WITDH, GAME_HEIGHT, RATIO } from "./util.js";
/* game.js - the brain of our code base
    will the central orchestrator that initializes all systems
    manages the game-loop
    handles state transistions and
    coordinates communication between all other components */

    /* export allows other files to import this Game class using ES6 syntax
        this keeps the code organized and avoids global namespace pollution */
export class Game
{ // constructor is a special method that runs once when the class is instantiated, setting up all initial properties
    constructor(screen)
    {
        console.log(this.constructor.name.concat(` @ ${new Date().toLocaleString()}`));

        this.screen = screen;
        this.context = screen.getContext("2d");

        this.initialize();
    }

    initialize()
    { // when we first initialize
        this.resize();

        window.addEventListener("resize", () =>
        { // and we listen everytime the browser is resized
            this.resize();
        });
    }

    resize()
    {
        let width = 0, height = 0;
        const margin = 50;
        const available_width = (window.innerWidth - margin) * 2
        const available_height = (window.innerHeight - margin) * 2

        if (available_width / available_height > RATIO)
        {
            height = available_height;
            width = height * RATIO;
        }
        else
        {
            width = available_width;
            height = width / RATIO;
        }

        this.screen.width = GAME_WITDH;
        this.screen.height = GAME_HEIGHT;
        this.screen.style.width = `${width}px`
        this.screen.style.height = `${height}px`
        this.screen.style.margin = `${margin}px`
    }
}
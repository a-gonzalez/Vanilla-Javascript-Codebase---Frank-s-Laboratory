import { GAME_WIDTH, GAME_HEIGHT, RATIO } from "./util.js";
import { Rendering } from "../system/rendering.js";
import Player from "../entity/player.js";
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
        console.info(this.constructor.name.concat(` @ ${new Date().toLocaleString()}`));

        /* dependency injection of required tool (canvas) to draw on it,
        and by passing it in rather than having Render grab it directly,
        we keep our code modular, testable, and flexible.
        dependency injection is a desigh pattern where an object not 
        create the tools it needs to work instead those tools are injected (passed)
        from the outside. */
        this.screen = screen;
        this.rendering = new Rendering(screen);
        this.player = new Player();

        this.initialize();
    }

    initialize()
    { // when we first initialize
        this.resize();

        window.addEventListener("resize", () =>
        { // and we listen everytime the browser is resized
            this.resize();
        });

        /* start the game loop - update(), draw() / render()
           requestAnimationFrame automatically adjusts itself to
           the user's screen refresh rate
           it also automatically provides a time_stamp
           timestamp is the number of milliseconds that have passed
           since the page started running. Timestamp comes the machine's
           internal clock
        */
        requestAnimationFrame((timestamp) => this.loop(timestamp));
    }

    resize()
    {
        let width = 0, height = 0;
        const margin = 15;
        const available_width = window.innerWidth - margin * 2
        const available_height = window.innerHeight - margin * 2

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

        this.screen.width = GAME_WIDTH;
        this.screen.height = GAME_HEIGHT;
        this.screen.style.width = `${width}px`
        this.screen.style.height = `${height}px`
        this.screen.style.margin = `${margin}px`
    }

    // we use ES6 arrow function - a modern Javascript syntax that doe not create its own "this" reference,
    loop(timestamp)// but instead keeps the "this" value from where it was defined. "this" correctly statys bound to our game class
    {// requestAnimationFrame tells the browser
        //console.info(`Looping... ${new Date().toTimeString()}`)
        //console.info(`Looping... ${timestamp / 1000} seconds`)
        this.rendering.render(this.player);

        requestAnimationFrame((timestamp) => this.loop(timestamp)); // to call our game loop right before the next screen repaint
    }// meaning right before the frame gets drawn.

    
}
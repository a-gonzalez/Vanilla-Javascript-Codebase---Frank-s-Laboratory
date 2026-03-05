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
        this.x = 0;

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

        this.screen.width = GAME_WITDH;
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
        this.render();

        requestAnimationFrame((timestamp) => this.loop(timestamp)); // to call our game loop right before the next screen repaint
    }// meaning right before the frame gets drawn.

    render()
    {
        this.clear();

        this.context.fillStyle = "#ff0000"; // red
        // let's draw a rectangle - x: 50, y: 50, width: 200, height: 200
        this.context.fillRect(this.x, 50, 100, 100);

        this.x += 2;
    }

    clear()
    {// clearing the canvas every frame is important because
     // otherwise we would be drawing on previous drawings
        this.context.fillStyle = "#0f3460";
        this.context.fillRect(0, 0, GAME_WITDH, GAME_HEIGHT);
    }
}
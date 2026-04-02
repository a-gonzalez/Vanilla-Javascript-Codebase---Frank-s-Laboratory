import { GAME_WIDTH, GAME_HEIGHT, RATIO } from "./util.js";
import Rendering from "../system/rendering.js";
import Imaging from "../manager/imaging.js";
import Player from "../entity/player.js";
/* game.js - the brain of our code base
    will the central orchestrator that initializes all systems
    manages the game-loop
    handles state transistions and
    coordinates communication between all other components */

    /* export allows other files to import this Game class using ES6 syntax
        this keeps the code organized and avoids global namespace pollution */
export default class Game
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
    }

    initialize()
    { // when we first initialize
        this.resize();

        window.addEventListener("resize", () =>
        { // and we listen everytime the browser is resized
            this.resize();
        });
        this.setupListeners();
        this.setUpUI();

        /* lookup table
        is a data structure (usually object or an array)
        use to store information so you can retrieve it 
        quickly later without running complex logic or
        loops this.keys = { w: true, a: false -> arrow_up: false arrow_down: false } */
        this.keys = {};
        this.previous_stamp = 0;
        this.imaging = new Imaging();
        this.imaging.loadAll();
        this.rendering = new Rendering(this.screen, this.imaging);
        this.player = new Player();
        /* start the game loop - update(), draw() / render()
           requestAnimationFrame automatically adjusts itself to
           the user's screen refresh rate
           it also automatically provides a time_stamp
           timestamp is the number of milliseconds that have passed
           since the page started running. Timestamp comes the machine's
           internal clock
        */
        this.previous_stamp = performance.now();
        requestAnimationFrame((time_stamp) => this.loop(time_stamp));
    }

    setUpUI()
    {
        document.getElementById("btnPlay").onclick = () =>
        {
            this.start();
        };
    }

    hidePanels()
    {// remove "active" class which makes panel visible
        document.querySelectorAll(".ui-panel").forEach(p => p.classList.remove("active"));
    }

    start()
    {
        this.hidePanels();
    }

    update(delta_time)
    {
        this.player.update(delta_time, this.keys);
    }

    setupListeners()
    {
        window.addEventListener("keydown", (event) =>
        {
            this.keys[event.key.toLowerCase()] = true;
        });

        window.addEventListener("keyup", (event) =>
        {
            this.keys[event.key.toLowerCase()] = false;
        });

        window.addEventListener("contextmenu", () =>
        { // clear all keys when context menu opens
            this.keys = {};
        });

        window.addEventListener("blur", () =>
        { // clear all keys when window loses focus
            this.keys = {};
        });
    }

    resize()
    {
        let width = 0, height = 0;
        const margin = 10;
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
    loop(time_stamp)// but instead keeps the "this" value from where it was defined. "this" correctly statys bound to our game class
    {// console.info(`Looping... ${timestamp / 1000} seconds`)
        // delta-time is the amount of time that passed between two animation frames
        // (16.6 ~ 60 fps) 1000ms / 60 = 16.6ms
        const delta_time = Math.min((time_stamp - this.previous_stamp) / 1000, 0.1);

        this.previous_stamp = time_stamp;
        this.update(delta_time);
        this.rendering.render(this.player);

        requestAnimationFrame((time_stamp) => this.loop(time_stamp)); //requestAnimationFrame tells the browser        to call our game loop right before the next screen repaint
    }// meaning right before the frame gets drawn.

    
}
import { GAME_WIDTH, GAME_HEIGHT, RATIO } from "./util.js";
import Rendering from "../system/rendering.js";
import GManager from "../manager/IManager.js";
import AManager from "../manager/AManager.js";
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
        this.keys = {};
        this.previous_stamp = 0;
        this.state = "menu";
        this.IManager = new GManager();
        this.AManager = new AManager();
        this.rendering = new Rendering(this.screen, this.IManager);
        this.player = new Player();
    }

    async initialize()
    { // when we first initialize
        await Promise.all([//Promise.all([]) takes an array of Promises and waits for all of them to complete in parallel
            this.IManager.loadAll()
        ]);
        document.getElementById("loading").classList.remove("active");
        document.getElementById("mainmenu").classList.add("active");

        this.resize();

        window.addEventListener("resize", () =>
        { // and we listen everytime the browser is resized
            this.resize();
        });
        this.setupInput();
        this.setUpUI();

        /* lookup table
        is a data structure (usually object or an array)
        use to store information so you can retrieve it 
        quickly later without running complex logic or
        loops this.keys = { w: true, a: false -> arrow_up: false arrow_down: false } */
        
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

        document.getElementById("btnResume").onclick = () =>
        {
            this.resume();
        };

        document.getElementById("btnQuit").onclick = () =>
        {
            this.returnToMenu();
        };
    }

    hidePanels()
    {// remove "active" class which makes panel visible
        document.querySelectorAll(".ui-panel").forEach(p => p.classList.remove("active"));
    }

    start()
    {
        this.state = "playing";
        this.hidePanels();

        // reset player position
        this.player.reset();
        // this resets the time reference -  if player was on menu for a while, the next frame delta-time calculation could be huge potentionally causing player to "teleport"
        this.previous_stamp = performance.now();//performance.now() gives us the current high-resolution time-stamp
    }

    pause()
    {
        this.state = "paused";

        document.getElementById("pausemenu").classList.add("active");
    }

    resume()
    {
        this.state = "playing";

        document.getElementById("pausemenu").classList.remove("active");
    }

    returnToMenu()
    {
        this.state = "mainmenu";
        this.hidePanels();

        document.getElementById("mainmenu").classList.add("active");
    }

    update(delta_time)
    {
        if (this.state !== "playing") return;
        this.player.update(delta_time, this.keys);
    }

    render()
    {
        let context = this.screen.getContext("2d");

        if (this.state === "menu")
        {
            context.fillStyle = "#0f3460";
            context.fillRect(0, 0, this.screen.width, this.screen.height);
        }
        else
        {
            this.rendering.render(this.player);
        }
    }

    setupInput()
    {
        window.addEventListener("keydown", (event) =>
        {
            this.keys[event.key.toLowerCase()] = true;

            // ESC toggles pause
            if (event.key === "Escape")
            {
                if (this.state === "playing")
                {
                    this.pause();
                }
                else if (this.state === "paused")
                {
                    this.resume();;
                }
            }
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
        if (this.previous_stamp === 0)
        {
            this.previous_stamp = time_stamp;
        }
        // delta-time is the amount of time that passed between two animation frames
        // (16.6 ~ 60 fps) 1000ms / 60 = 16.6ms
        const delta_time = Math.min((time_stamp - this.previous_stamp) / 1000, 0.1);

        this.previous_stamp = time_stamp;
        this.update(delta_time);
        this.render();

        requestAnimationFrame((time_stamp) => this.loop(time_stamp)); //requestAnimationFrame tells the browser        to call our game loop right before the next screen repaint
    }// meaning right before the frame gets drawn.

    
}
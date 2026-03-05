import { GAME_WITDH, GAME_HEIGHT, TILE_SIZE } from "../core/util.js";
/*
    this system will encapsulate all rendering logic,
    taking game data and translating it into visuals
    on the canvas (screen). this strategy helps keep our
    code organized and separate from our game logic
*/
export class Rendering
{
    constructor(screen)
    {
        console.log(this.constructor.name.concat(` @ ${new Date().toLocaleString()}`));

        this.screen = screen;
        this.context = screen.getContext("2d");
        this.context.imageSmoothingEnabled = false; // prevents browser from blurring graphics
    }

    grid()
    {
        this.context.strokeStyle = "rgb(255, 255, 255, 0.5)";
        this.context.lineWidth = 1;

        for (let index = 0; index < GAME_WITDH; index += TILE_SIZE)
        {
            this.context.beginPath();
            this.context.moveTo(index, 0);
            this.context.lineTo(index, GAME_HEIGHT);
            this.context.stroke();
        }

        for (let index = 0; index < GAME_HEIGHT; index += TILE_SIZE)
        {
            this.context.beginPath();
            this.context.moveTo(0, index);
            this.context.lineTo(GAME_WITDH, index);
            this.context.stroke();
        }
    }

    render()
    {
        this.clear();
        this.grid();
    }

    clear()
    {// clearing the canvas every frame is important because
     // otherwise we would be drawing on previous drawings
        this.context.fillStyle = "#0f3460";
        this.context.fillRect(0, 0, GAME_WITDH, GAME_HEIGHT);
    }
}
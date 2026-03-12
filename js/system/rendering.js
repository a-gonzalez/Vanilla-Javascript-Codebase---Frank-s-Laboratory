import { GAME_WIDTH, GAME_HEIGHT, TILE_SIZE } from "../core/util.js";
/*
    this system will encapsulate all rendering logic,
    taking game data and translating it into visuals
    on the canvas (screen). this strategy helps keep our
    code organized and separate from our game logic
*/
export default class Rendering
{
    constructor(screen, imaging)
    {
        console.info(this.constructor.name.concat(` @ ${new Date().toLocaleString()}`));

        this.screen = screen;
        this.context = screen.getContext("2d");
        this.context.imageSmoothingEnabled = false; // prevents browser from blurring graphics
        this.imaging = imaging;
    }

    grid()
    {
        this.context.strokeStyle = "rgb(255, 255, 255, 0.5)";
        this.context.lineWidth = 0.2;

        for (let index = 0; index < GAME_WIDTH; index += TILE_SIZE)
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
            this.context.lineTo(GAME_WIDTH, index);
            this.context.stroke();
        }
    }

    render(player)
    {
        this.clear();
        this.grid();
        this.renderPlayer(player);
    }

    renderPlayer(player)
    {
        const image = this.imaging.get("player");

        if (image)
        {
            this.context.drawImage(image.image, player.x, player.y, player.width, player.height);
            this.context.strokeStyle = "#ffffff";
            this.context.strokeRect(player.x, player.y, player.width, player.height);
        }
        else
        {
            this.context.fillStyle = "#1a1a2e";
            this.context.fillRect(player.x, player.y, player.width, player.height);
            this.context.strokeStyle = "#ffffff";
            this.context.strokeRect(player.x, player.y, player.width, player.height);
        }
    }

    clear()
    {// clearing the canvas every frame is important because
     // otherwise we would be drawing on previous drawings
        this.context.fillStyle = "#0f3460";
        this.context.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    }
}
import { GAME_WIDTH, GAME_HEIGHT } from "../core/util.js";

export default class Player
{
    constructor()
    {
        console.info(this.constructor.name.concat(` @ ${new Date().toLocaleString()}`));

        this.x = GAME_WIDTH / 2;
        this.y = GAME_HEIGHT / 2;
        this.width = 64;
        this.height = 64;

    }

    update(keys)
    {
        if (keys['w'] || keys['arrowup'])
        {
            --this.y;
        }
        else if (keys['s'] || keys['arrowdown'])
        {
            ++this.y;
        }
        else if (keys['a'] || keys['arrowleft'])
        {
            --this.x;
        }
        else if (keys['d'] || keys['arrowright'])
        {
            ++this.x;
        }
    }
}
import { GAME_WIDTH, GAME_HEIGHT } from "../core/util.js";

export default class Player
{
    constructor()
    {
        console.info(this.constructor.name.concat(` @ ${new Date().toLocaleString()}`));

        this.width = 32;
        this.height = 32;
        this.x = (GAME_WIDTH - this.width) / 2;
        this.y = (GAME_HEIGHT - this.height) / 2;
        
        this.speed = 100; // x pixels per movement

        // multipliers for upgrades or level progression
        this.speed_multiplier = 3;
        this.scale = 2;
    }

    update(delta_time, keys)
    { // reset every frame
        let dx = 0, dy = 0

        if (keys['w'] || keys['arrowup']) dy -= 1;
        if (keys['s'] || keys['arrowdown']) dy += 1;
        if (keys['a'] || keys['arrowleft']) dx -= 1;
        if (keys['d'] || keys['arrowright']) dx += 1;

        // normalize diagonal movement
        if (dx || dy)
        {// vector - a value with both direction and magnitude
            const length = Math.sqrt(dx * dx + dy * dy);

            dx /= length;
            dy /= length;

            this.y += dy * this.speed * this.speed_multiplier * delta_time;
            this.x += dx * this.speed * this.speed_multiplier * delta_time;
        }// keep the player in bounds
        this.x = Math.max(0, Math.min(GAME_WIDTH - this.width * this.scale, this.x));
        this.y = Math.max(0, Math.min(GAME_HEIGHT - this.height * this.scale, this.y));
    }
}
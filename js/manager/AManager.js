// audio-manager will load, cache and provide access
// to all graphic assets in our game
export default class AManager
{
    constructor()
    {
        console.info(this.constructor.name.concat(` @ ${new Date().toLocaleString()}`));
    }
}
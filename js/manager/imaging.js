// imaging will load, cache and provide access
// to all image assets in our game
export default class Imaging
{
    constructor()
    {
        console.info(this.constructor.name.concat(` @ ${new Date().toLocaleString()}`));

        this.images = {};
    }

    load(name, path)
    {
        const image = new Image();
        image.src = path;

        this.images[name] = { image, loaded: false };

        image.onload = () =>
        {
            this.images[name].loaded = true;

            //console.info(`Image ${name} loaded successfully.`);
        };

        image.onerror = () =>
        {
            console.error(`Image "${name}" failed!`);
        }
    }

    loadAll()
    {
        this.load("player", "/assets/img/player.png");
    }

    get(name)
    {
        return (this.images[name]?.loaded) ? this.images[name] : null;
    }
}
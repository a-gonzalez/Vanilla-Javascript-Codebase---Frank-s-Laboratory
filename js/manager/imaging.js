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
    {// in javascript a Promise is a special object that acts as a place-holder
        return new Promise((resolve) => // for a result that has not happened yet
        {
            const image = new Image();
            image.src = path;

            this.images[name] = { image, loaded: false };

            image.onload = () =>
            {
                this.images[name].loaded = true;

                //console.info(`Image ${name} loaded successfully.`);
                resolve();
            };

            image.onerror = () =>
            {
                console.error(`Image "${name}" load failed!`);

                resolve();
            }
        });
        
    }


    /* async / await is syntactic sugar over Promises that makes asynchronous code easier to read */
    async loadAll()// marking the function async allows me to use await inside it and makes loadAll() return a Promise that my Game class can also await
    {// Because some tasks (like fetching data from a server or loading an image) take time
        await Promise.all([ // javascript uses Promises to manage that waiting period without
            this.load("player", "/assets/img/player.png") // freezing your entire program
        ]);// the await keyword pauses execution until Promise.all() completes
        
    }

    get(name)
    {
        return (this.images[name]?.loaded) ? this.images[name] : null;
    }
}
// audio-manager will load, cache and provide access
// to all graphic assets in our game
export default class AManager
{
    constructor()
    {
        console.info(this.constructor.name.concat(` @ ${new Date().toLocaleString()}`));

        this.sounds = {};
    }

    load(name, path)
    {
        return new Promise((resolve) =>
        {
            const audio = new Audio(path);
            this.sounds[name] = { audio, loaded: false };

            audio.onloadeddata = () =>
            {// this handler / hook runs when the audio file has finished loading and is ready
                this.sounds[name].loaded = true; // to play

                console.info(`Audio loaded: ${name}`);

                resolve();
            }

            audio.onerror = () =>
            {// on-error for if the audio can't be found or it fails for some other reason
                console.error(`Audio failed: ${name} (skipping...)`);

                resolve();
            }
        });
    }

    play(name)
    {
        const sound = this.sounds[name];

        if (sound && sound.loaded)
        {
            // currentTime sets the current playback position in seconds,
            // so setting ig to zero makes sure the audio plays from the beginning every time
            sound.audio.currentTime = 0;
            sound.audio.play().catch(err =>
            {
                console.error(`Could not play ${name}`, err);
            });
        }
    }

    async loadAll()
    {
        await Promise.all([
            this.load("pause", "/assets/aud/pause.mp3") ,
            this.load("unpause", "/assets/aud/unpause.mp3") ,
            this.load("click", "/assets/aud/button_click.mp3") ,
            this.load("hover", "/assets/aud/button_hover.mp3") ,
        ]);
    }
}
class EtuneSharedCompendium {
    static ID = 'etune-shared-compendium';

    static log(force, ...args) {
        const shouldLog = force || game.modules.get('_dev-mode')?.api?.getPackageDebugValue(this.ID);

        if (shouldLog) {
            console.log(this.ID, '|', ...args);
        }
    }

    static _inject(compendium, buttons) {        
		if (!game.user.isGM) return;
        if (compendium.title != "Etune actors") return;
        buttons.unshift(
            {
                "label": "Push to Etune",
                "class": "text",
                "icon": "fas fa-upload",
                "onclick": async () => {
                    await EtuneSharedCompendiumLogic.push();
                }
            }
        );
    }

    // Actor.deleteDocuments(["et87x2QPO6nSkYCZ"], {pack: "etune-shared-compendium.actors"})
}

class EtuneSharedCompendiumLogic {
    static ACTORS_COMPENDIUM_NAME = 'etune-shared-compendium.actors';

    static async _callServerPull() {
        const response = await fetch('http://localhost:8000/pull');
        console.log(response);
    }

    static async pull() {
        this._deleteSharedCompendiumData(this.ACTORS_COMPENDIUM_NAME);
        const actors = await this._getActorsFromGithub();
        this._populateSharedCompendium(actors, this.ACTORS_COMPENDIUM_NAME);
    }

    static async push() {
        await this._cleanDb();
        const actors = await this._getDataFromCompendium(this.ACTORS_COMPENDIUM_NAME);
        await actors.forEach(async element => await this._httpPostCallToGitServer(await element));
        await this._callServerPush();
    }

    static async _cleanDb() {
        await fetch('http://localhost:8000/clean');
    }

    static async _getDataFromCompendium(compendiumName) {
        const pack = await game.packs.get(compendiumName);
        return await pack.index.map(async i => await pack.getDocument(i._id));
    }

    static async _httpPostCallToGitServer(object) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(object);

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        await fetch("http://127.0.0.1:8000/write", requestOptions)
    }

    static async _getActorsFromGithub() {
        const response = await fetch('https://raw.githubusercontent.com/EtuneDnD/etune-shared-compendium-db/main/actors.db');
        const text = await response.text();
        const lines = text.split(/\r?\n/);

        return lines;
    }

    static async _callServerPush() {
        const response = await fetch('http://127.0.0.1:8000/push');
    }

    static async _deleteSharedCompendiumData(compendiumName) {
        const pack = game.packs.get(compendiumName);
        const ids = pack.index.map(i => i._id);
        await Actor.deleteDocuments(ids, {pack: compendiumName});
    }

    static async _populateSharedCompendium(objects, compendiumName) {
        objects.forEach(async element => {
            if(!element.includes('$$deleted":true')) {
                const actor = await Actor.create(JSON.parse(element), { pack: compendiumName });
            }
        });
    }
}

Hooks.on('getCompendiumHeaderButtons', EtuneSharedCompendium._inject)
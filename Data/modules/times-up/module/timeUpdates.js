import { disablePassiveEffects, effectQueue, saveQueue } from "./settings.js";
import { warn } from "../times-up.js";
import { GMAction, isConcentrationEffect, TUfromActorUuid } from "./utils.js";
import { handlePreUpdateCombat } from "./combatUpdate.js";
export async function purgeDeletedActors() {
    if (!game.user.isGM)
        return;
    let count = 0;
    for (let e of effectQueue.effects.keys()) {
        const { actorUuid, effectData } = effectQueue.effects.get(e);
        //@ts-ignore
        if (!actorUuid || !TUfromActorUuid(actorUuid)) {
            count++;
            effectQueue.effects.delete(e);
        }
        else {
        }
    }
    console.warn("times-up | Deleted", count, "effects with no actor");
}
export async function removeOrDisableEffects(actor, effects, reason = "expiry") {
    if (!disablePassiveEffects) {
        for (let effect of effects) {
            if (globalThis.Sequencer && effect.data.origin)
                globalThis.Sequencer.EffectManager.endEffects({ origin: effect.data.origin });
        }
        //@ts-ignore
        return actor.deleteEmbeddedDocuments("ActiveEffect", effects.map(ef => ef.id), { "expiry-reason": reason });
    }
    let removeEffects = [];
    let disableEffects = [];
    removeEffects = effects.filter(ef => !ef.data.flags?.dae?.transfer);
    disableEffects = effects
        .filter(ef => ef.data.flags?.dae?.transfer)
        .map(ef => {
        return {
            _id: ef.data._id,
            "disabled": true,
            "duration.startRound": null,
            "duration.startTurn": null,
            "duration.startTime": null
        };
    });
    for (let effect of removeEffects) {
        if (globalThis.Sequencer && effect.data.origin)
            await globalThis.Sequencer.EffectManager.endEffects({ origin: effect.data.origin });
    }
    //@ts-ignore
    await actor.updateEmbeddedDocuments("ActiveEffect", disableEffects);
    //@ts-ignore
    return actor.deleteEmbeddedDocuments("ActiveEffect", removeEffects.map(ef => ef.data._id), { "expiry-reason": reason });
}
export var socketlibSocket = undefined;
export let setupSocket = () => {
    socketlibSocket = globalThis.socketlib.registerModule("times-up");
    socketlibSocket.register("handlePreUpdateCombat", _handlePreUpdateCombat);
};
async function _handlePreUpdateCombat(combatId, update, options, user) {
    let combat = game.combats.get(combatId);
    if (!combat)
        return null;
    return await handlePreUpdateCombat.bind(combat)(update, options, user);
}
export function readyTimesUpSetup() {
    if (game.user.isGM) {
        Hooks.on("updateWorldTime", async (worldTime, dt) => {
            let found = false;
            for (let efKey of effectQueue.effects.keys()) {
                const efqEntry = effectQueue.effects.get(efKey);
                let { actorUuid, effectData } = efqEntry;
                warn("update world time", efqEntry, actorUuid, effectData._id, effectData);
                let expired = effectData.duration?.seconds && (worldTime - effectData.duration.startTime) >= effectData.duration.seconds;
                if (effectData.duration?.rounds || effectData.duration?.turns) { // think about if want to do anything here
                }
                if (expired && effectData.duration.seconds) {
                    const actor = TUfromActorUuid(actorUuid);
                    const effect = actor?.effects.get(effectData._id);
                    if (actor && effect && !isConcentrationEffect(actor, effectData)) {
                        try {
                            // await actor.deleteEmbeddedDocuments("ActiveEffect", [effectData._id])
                            await removeOrDisableEffects(actor, [effect], "times-up:duration-seconds");
                        }
                        catch (err) {
                            warn("delete effect failed ", err);
                        }
                    }
                    effectQueue.effects.delete(efKey);
                    found = true;
                }
            }
            ;
            if (found)
                await saveQueue();
        });
        Hooks.on("createActiveEffect", (effect, options) => {
            //@ts-ignore documentclass
            if (!(effect.parent instanceof CONFIG.Actor.documentClass))
                return true;
            if (effect.data.duration?.seconds)
                GMAction("createEffect", effect.parent, effect.data);
        });
        Hooks.on("preUpdateActiveEffect", (effect, update, options, user) => {
            if (update.disabled === false && disablePassiveEffects) {
                effect.data.update({ "duration.startTime": game.time.worldTime });
                if (game.combat) { // TODO need to work out which is the right combat to use?
                    //@ts-ignore round/turn
                    effect.data.update({ "duration.startRound": game.combat.current.round, "duration.startTurn": game.combat.current.turn });
                }
            }
        });
        Hooks.on("updateActiveEffect", (effect, update, options) => {
            //@ts-ignore documentclass
            if (!(effect.parent instanceof CONFIG.Actor.documentClass))
                return true;
            if (effect.data.duration?.seconds)
                GMAction("updateEffect", effect.parent, effect.data);
            // if (hasSpecialDuration(effectData)) GMAction("updateSpecial", actor, effectData);
        });
        Hooks.on("deleteActiveEffect", (effect, options) => {
            //@ts-ignore documentclass
            if (!(effect.parent instanceof CONFIG.Actor.documentClass))
                return true;
            GMAction("deleteEffect", effect.parent, effect.data);
        });
        Hooks.on("preDeleteActiveEffect", (effect, data, options) => {
            //@ts-ignore documentclass
            if (!(effect.parent instanceof CONFIG.Actor.documentClass))
                return true;
            GMAction("deleteEffect", effect.parent, effect.data);
        });
    }
}
export function initTimesUpSetup() {
}
export function hasMacroRepeat(effectData) {
    return (["startEveryTurn", "endEveryTurn"].includes(effectData.flags?.dae?.macroRepeat));
}
export function getMacroRepeat(effectData) {
    return effectData.flags?.dae?.macroRepeat;
}

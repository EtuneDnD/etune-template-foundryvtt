import { warn, debug } from "../times-up.js";
import { effectQueue, saveQueue } from "./settings.js";
export function removeConcentrationEffects(actor, effects) {
    return effects?.filter(ef => !isConcentrationEffect(actor, ef.data));
}
export function isConcentrationEffect(actor, effectData) {
    const midiFlags = actor.data.flags["midi-qol"];
    if (!midiFlags || !midiFlags["concentration-data"])
        return false;
    const concentrationUuid = midiFlags["concentration-data"].uuid;
    return effectData.orign === concentrationUuid;
}
export function GMAction(action, actor, effectData) {
    //@ts-ignore contents
    let intendedGM = game.users.contents.find(u => u.isGM && u.active);
    if (intendedGM.id === game.user.id) {
        warn("Gmaction", action, actor.uuid, effectData);
        switch (action) {
            case "createEffect":
                debug("create effect ", effectData, actor);
                if (hasDuration(effectData)) {
                    if (!effectData.duration.startTime)
                        effectData.duration.startTime = game.time.worldTime;
                    effectQueue.effects.set(effectData._id, { actorUuid: actor.uuid, effectData });
                    saveQueue();
                }
                break;
            case "deleteEffect":
                warn("Delete effect", actor, effectData);
                var effectDataId;
                if (typeof effectData === "string")
                    effectDataId = effectData;
                else
                    effectDataId = effectData?._id;
                if (effectQueue.effects.has(effectDataId)) {
                    effectQueue.effects.delete(effectDataId);
                    saveQueue();
                }
                break;
            case "updateEffect":
                warn("update effect", actor, effectData);
                effectQueue.effects.set(effectData._id, { actorUuid: actor.uuid, effectData });
                saveQueue();
        }
    }
}
export function TUfromUuid(uuid) {
    let parts = uuid.split(".");
    let doc;
    if (parts[0] === "Compendium")
        return undefined;
    const [docName, docId] = parts.slice(0, 2);
    parts = parts.slice(2);
    const collection = CONFIG[docName].collection.instance;
    doc = collection.get(docId);
    // Embedded Documents
    while (parts.length > 1) {
        const [embeddedName, embeddedId] = parts.slice(0, 2);
        doc = doc.getEmbeddedDocument(embeddedName, embeddedId);
        parts = parts.slice(2);
    }
    return doc || null;
}
export function TUfromActorUuid(uuid) {
    let parts = uuid.split(".");
    let doc;
    if (parts[0] === "Compendium")
        return undefined;
    const [docName, docId] = parts.slice(0, 2);
    parts = parts.slice(2);
    const collection = CONFIG[docName].collection.instance;
    doc = collection.get(docId);
    // Embedded Documents
    while (doc && parts.length > 1) {
        const [embeddedName, embeddedId] = parts.slice(0, 2);
        doc = doc.getEmbeddedDocument(embeddedName, embeddedId);
        parts = parts.slice(2);
    }
    if (doc instanceof CONFIG.Token.documentClass)
        doc = doc.actor;
    return doc || null;
}
export function hasDuration(effectData) {
    return effectData.duration && (effectData.duration.seconds || effectData.duration.turns || effectData.duration.rounds);
}

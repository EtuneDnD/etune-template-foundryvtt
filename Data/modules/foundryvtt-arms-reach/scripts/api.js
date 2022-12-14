import { DoorsReach } from "./DoorsReach.js";
import { DrawingsReach } from "./DrawingsReach.js";
import { LightsReach } from "./LightsReach.js";
import { NotesReach } from "./NotesReach.js";
import { SoundsReach } from "./SoundsReach.js";
import { StairwaysReach } from "./StairwaysReach.js";
import { TilesReach } from "./TilesReach.js";
import { TokensReach } from "./TokensReach.js";
import { WallsReach } from "./WallsReach.js";
import { globalInteractionDistanceUniversal } from "./ArmsReachHelper.js";
import { checkElevation, error, warn } from "./lib/lib.js";
import CONSTANTS from "./constants.js";
const API = {
    combatRangeOverlay: {},
    async isReachableArr(...inAttributes) {
        if (!Array.isArray(inAttributes)) {
            throw error("isReachable | inAttributes must be of type array");
        }
        const [token, placeableObject, maxDistance, useGrid, userId] = inAttributes;
        const result = await this.isReachable(token, placeableObject, maxDistance, useGrid, userId);
        return result;
    },
    async isReachableByTagArr(...inAttributes) {
        if (!Array.isArray(inAttributes)) {
            throw error("isReachableByTag | inAttributes must be of type array");
        }
        const [token, tag, maxDistance, useGrid, userId] = inAttributes;
        const result = await this.isReachableByTag(token, tag, maxDistance, useGrid, userId);
        return result;
    },
    async isReachableByIdArr(...inAttributes) {
        if (!Array.isArray(inAttributes)) {
            throw error("isReachableById | inAttributes must be of type array");
        }
        const [token, placeableObjectId, maxDistance, useGrid, userId] = inAttributes;
        const result = await this.isReachableById(token, placeableObjectId, maxDistance, useGrid, userId);
        return result;
    },
    async isReachableByIdOrNameArr(...inAttributes) {
        if (!Array.isArray(inAttributes)) {
            throw error("isReachableByIdOrName | inAttributes must be of type array");
        }
        const [token, placeableObjectIdOrName, maxDistance, useGrid, userId] = inAttributes;
        const result = await this.isReachableByIdOrName(token, placeableObjectIdOrName, maxDistance, useGrid, userId);
        return result;
    },
    isReachableByTag(token, tag, maxDistance, useGrid, userId) {
        //@ts-ignore
        if (!game.modules.get(CONSTANTS.TAGGER_MODULE_NAME)?.active) {
            warn(`The module '${CONSTANTS.TAGGER_MODULE_NAME}' is not active can't use the API 'isReachableByTag'`, true);
            return false;
        }
        else {
            const placeableObjects = 
            //@ts-ignore
            Tagger?.getByTag(tag, { caseInsensitive: true }) || undefined;
            if (!placeableObjects) {
                return false;
            }
            return this.isReachable(token, placeableObjects[0], maxDistance, useGrid, userId);
        }
    },
    isReachableById(token, placeableObjectId, maxDistance, useGrid, userId) {
        // const sceneId = game.scenes?.current?.id;
        const objects = this._getObjectsFromScene(game.scenes?.current);
        const object = objects.filter((obj) => {
            obj.id === placeableObjectId;
        })[0];
        if (!object) {
            warn(`No placeable object find for the id '${placeableObjectId}' can't use the API 'isReachableById'`, true);
            return false;
        }
        return this.isReachable(token, object, maxDistance, useGrid, userId);
    },
    isReachableByIdOrName(token, placeableObjectIdOrName, maxDistance, useGrid, userId) {
        // const sceneId = game.scenes?.current?.id;
        const objects = this._getObjectsFromScene(game.scenes?.current);
        const object = this._retrieveFromIdOrName(objects, placeableObjectIdOrName);
        if (!object) {
            warn(`No placeable object find for the id '${placeableObjectIdOrName}' can't use the API 'isReachableByIdOrName'`, true);
            return false;
        }
        return this.isReachable(token, object, maxDistance, useGrid, userId);
    },
    isReachable(token, placeableObject, maxDistance, useGrid, userId) {
        // const userId = <string>game.users?.find((u:User) => return u.id = gameUserId)[0];
        let relevantDocument = placeableObject?.document ? placeableObject?.document : placeableObject;
        // if (placeableObject instanceof PlaceableObject) {
        // 	relevantDocument = placeableObject?.document;
        // } else {
        // 	relevantDocument = placeableObject;
        // }
        let isInReach = false;
        if (relevantDocument instanceof TokenDocument) {
            const tokenTarget = canvas.tokens?.placeables?.find((x) => {
                return x.id === placeableObject.id;
            });
            isInReach = TokensReach.globalInteractionDistance(token, tokenTarget, maxDistance, useGrid, userId);
        }
        else if (relevantDocument instanceof AmbientLightDocument) {
            const ambientLightTarget = canvas.lighting?.placeables?.find((x) => {
                return x.id === placeableObject.id;
            });
            isInReach = LightsReach.globalInteractionDistance(token, ambientLightTarget, maxDistance, useGrid, userId);
        }
        else if (relevantDocument instanceof AmbientSoundDocument) {
            const ambientSoundTarget = canvas.sounds?.placeables?.find((x) => {
                return x.id === placeableObject.id;
            });
            isInReach = SoundsReach.globalInteractionDistance(token, ambientSoundTarget, maxDistance, useGrid, userId);
            // } else if(relevantDocument instanceof MeasuredTemplateDocument){
            //   const measuredTarget = <MeasuredTemplate>canvas.templates?.placeables?.find((x:MeasuredTemplate) => {return x.id === <string>placeableObject.id;});
            //   isInReach = MeasuredsReach.globalInteractionDistance(token,ambientSoundTarget);
        }
        else if (relevantDocument instanceof TileDocument) {
            //@ts-ignore
            const tileTarget = canvas.tiles?.placeables?.find((x) => {
                return x.id === placeableObject.id;
            });
            isInReach = TilesReach.globalInteractionDistance(token, tileTarget, maxDistance, useGrid, userId);
        }
        else if (relevantDocument instanceof WallDocument) {
            const doorControlTarget = canvas.controls?.doors?.children.find((x) => {
                //@ts-ignore
                return x.wall.id === placeableObject.id;
            });
            if (doorControlTarget) {
                isInReach = DoorsReach.globalInteractionDistance(token, doorControlTarget, false, maxDistance, useGrid, userId);
            }
            else {
                const wallTarget = canvas.walls?.placeables?.find((x) => {
                    return x.id === placeableObject.id;
                });
                isInReach = WallsReach.globalInteractionDistance(token, wallTarget, maxDistance, useGrid, userId);
            }
        }
        else if (relevantDocument instanceof DrawingDocument) {
            const drawingTarget = canvas.drawings?.placeables?.find((x) => {
                return x.id === placeableObject.id;
            });
            isInReach = DrawingsReach.globalInteractionDistance(token, drawingTarget, maxDistance, useGrid, userId);
        }
        else if (relevantDocument instanceof NoteDocument) {
            const noteTarget = canvas.notes?.placeables?.find((x) => {
                return x.id === placeableObject.id;
            });
            isInReach = NotesReach.globalInteractionDistance(token, noteTarget, maxDistance, useGrid, userId);
        }
        //@ts-ignore
        else if (relevantDocument?.name === "Stairway" || relevantDocument?.documentName === "Stairway") {
            //@ts-ignore
            const stairwayTarget = canvas.stairways?.placeables?.find((x) => {
                return x.id === placeableObject.id;
            });
            isInReach = StairwaysReach.globalInteractionDistanceSimple(token, { x: stairwayTarget.x, y: stairwayTarget.y }, maxDistance, useGrid, userId);
        }
        else {
            warn(` The document '${relevantDocument?.name}' is not supported from the API 'isReachable'`, true);
        }
        return isInReach;
    },
    isReachableByTagUniversal(placeableObjectSource, tag, maxDistance, useGrid, userId) {
        //@ts-ignore
        if (!game.modules.get(CONSTANTS.TAGGER_MODULE_NAME)?.active) {
            warn(`The module '${CONSTANTS.TAGGER_MODULE_NAME}' is not active can't use the API 'isReachableByTagUniversal'`, true);
            return false;
        }
        else {
            const placeableObjects = 
            //@ts-ignore
            Tagger?.getByTag(tag, { caseInsensitive: true }) || undefined;
            if (!placeableObjects) {
                return false;
            }
            return this.isReachableUniversal(placeableObjectSource, placeableObjects[0], maxDistance, useGrid, userId);
        }
    },
    isReachableByIdUniversal(placeableObjectSource, placeableObjectId, maxDistance, useGrid, userId) {
        // const sceneId = game.scenes?.current?.id;
        const objects = this._getObjectsFromScene(game.scenes?.current);
        const object = objects.filter((obj) => {
            obj.id === placeableObjectId;
        })[0];
        if (!object) {
            warn(`No placeable object find for the id '${placeableObjectId}' can't use the API 'isReachableByIdUniversal'`, true);
            return false;
        }
        return this.isReachableUniversal(placeableObjectSource, object, maxDistance, useGrid, userId);
    },
    isReachableByIdOrNameUniversal(placeableObjectSource, placeableObjectIdOrName, maxDistance, useGrid, userId) {
        // const sceneId = game.scenes?.current?.id;
        const objects = this._getObjectsFromScene(game.scenes?.current);
        const object = this._retrieveFromIdOrName(objects, placeableObjectIdOrName);
        if (!object) {
            warn(`No placeable object find for the id '${placeableObjectIdOrName}' can't use the API 'isReachableByIdOrNameUniversal'`, true);
            return false;
        }
        return this.isReachableUniversal(placeableObjectSource, object, maxDistance, useGrid, userId);
    },
    isReachableUniversal(placeableObjectSource, placeableObjectTarget, maxDistance, useGrid, userId) {
        // const userId = <string>game.users?.find((u:User) => return u.id = gameUserId)[0];
        const dist = globalInteractionDistanceUniversal(placeableObjectSource, placeableObjectTarget, useGrid);
        let isNotNearEnough = false;
        if (game.settings.get(CONSTANTS.MODULE_NAME, "autoCheckElevationByDefault")) {
            const res = checkElevation(placeableObjectSource, placeableObjectTarget);
            if (!res) {
                warn(`The token '${placeableObjectSource.name}' is not on the elevation range of this placeable object`);
                return false;
            }
        }
        // OLD SETTING
        if (game.settings.get(CONSTANTS.MODULE_NAME, "globalInteractionDistance") > 0 || useGrid) {
            const maxDist = maxDistance && maxDistance > 0
                ? maxDistance
                : game.settings.get(CONSTANTS.MODULE_NAME, "globalInteractionDistance");
            isNotNearEnough = dist > maxDist;
        }
        else {
            const maxDist = maxDistance && maxDistance > 0
                ? maxDistance
                : game.settings.get(CONSTANTS.MODULE_NAME, "globalInteractionMeasurement");
            isNotNearEnough = dist > maxDist;
        }
        if (isNotNearEnough) {
            // TODO add a warning  dialog ?
            return false;
        }
        else {
            return true;
        }
    },
    // ==========================================
    // UTILITY
    // ==========================================
    _getObjectsFromScene(scene) {
        return [
            ...Array.from(scene.tokens),
            ...Array.from(scene.lights),
            ...Array.from(scene.sounds),
            ...Array.from(scene.templates),
            ...Array.from(scene.tiles),
            ...Array.from(scene.walls),
            ...Array.from(scene.drawings),
            //@ts-ignore
            ...Array.from(scene.stairways), // Add module stairways...
        ]
            .deepFlatten()
            .filter(Boolean);
    },
    _retrieveFromIdOrName(placeables, IdOrName) {
        let target;
        if (!placeables || placeables.length === 0) {
            return target;
        }
        if (!IdOrName) {
            return target;
        }
        target = placeables?.find((x) => {
            return x && x.id?.toLowerCase() === IdOrName.toLowerCase();
        });
        if (!target) {
            target = placeables?.find((x) => {
                return x && x.name?.toLowerCase() === IdOrName.toLowerCase();
            });
        }
        if (!target) {
            target = placeables?.find((x) => {
                return x && x.label?.toLowerCase() === IdOrName.toLowerCase();
            });
        }
        if (!target) {
            target = placeables?.find((x) => {
                return x && x.name?.toLowerCase() === IdOrName.toLowerCase();
            });
        }
        if (!target) {
            target = placeables?.find((x) => {
                return x && x.text?.toLowerCase() === IdOrName.toLowerCase();
            });
        }
        if (!target) {
            target = placeables?.find((x) => {
                return x && x.label?.toLowerCase() === IdOrName.toLowerCase();
            });
        }
        if (!target) {
            target = placeables?.find((x) => {
                return x && x.entryId?.toLowerCase() === IdOrName.toLowerCase();
            });
        }
        return target;
    },
};
export default API;

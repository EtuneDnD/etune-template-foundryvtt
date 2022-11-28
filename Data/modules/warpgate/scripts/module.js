/** MIT (c) 2021 DnD5e Helpers */

import {
  logger
} from './logger.js';

const NAME = "warpgate";
const PATH = `/modules/${NAME}`;

export class MODULE {
  static data = {
      name: NAME,
      path: PATH,
      title: "Warp Gate"
    };

  static get isV10() {
    // @ts-ignore
    return game.release?.generation >= 10;
  }

  static async register() {
    logger.info("Initializing Module");
    MODULE.settings();
  }

  static async build() {
    
    logger.info("Module Data Built");
  }

  static setting(key) {
    return game.settings.get(MODULE.data.name, key);
  }

  static localize(key) {
    return game.i18n.localize(`warpgate.${key}`);
  }

  static format(key, data) {
    return game.i18n.format(`warpgate.${key}`, data);
  }

  static canSpawn(user) {
    const reqs = [
      'TOKEN_CREATE',
      'TOKEN_CONFIGURE',
      'FILES_BROWSE',
    ]

    return MODULE.canUser(user, reqs);
  }

  static canMutate(user) {
    const reqs = [
      'TOKEN_CONFIGURE',
      'FILES_BROWSE',
    ]

    return MODULE.canUser(user, reqs);
  }

  /**
   * @return {Array<String>} missing permissions for this operation
   */
  static canUser(user, requiredPermissions) {
    const {role} = user;
    const permissions = game.settings.get('core','permissions');
    return requiredPermissions.filter( req => !permissions[req].includes(role) ).map(missing => game.i18n.localize(CONST.USER_PERMISSIONS[missing].label));
  }

  /**
   * A helper functions that returns the first active GM level user.
   * @returns {User|undefined} First active GM User
   */
  static firstGM() {
    return game.users?.find(u => u.isGM && u.active);
  }

  /**
   * Checks whether the user calling this function is the user returned
   * by {@link warpgate.util.firstGM}. Returns true if they are, false if they are not.
   * @returns {boolean} Is the current user the first active GM user?
   */
  static isFirstGM() {
    return game.user?.id === MODULE.firstGM()?.id;
  }

  static emptyObject(obj){
    // @ts-ignore
    return MODULE.isV10 ? foundry.utils.isEmpty(obj) : isObjectEmpty(obj);
  }

  static removeEmptyObjects(obj) {
    let result = foundry.utils.flattenObject(obj);
    Object.keys(result).forEach( key => {
      if(typeof result[key] == 'object' && MODULE.emptyObject(result[key])) {
        delete result[key];
      } 
    });

    return foundry.utils.expandObject(result);
  }

  
  /**
   * Returns the first active user with owner permissions for the given document, 
   * falling back to the firstGM should there not be any. Returns false if the 
   * document is falsey. In the case of token documents it checks the permissions 
   * for the token's actor as tokens themselves do not have a permission object.
   *
   * @param {{ actor: Actor } | { document: { actor: Actor } } | Actor} doc
   *
   * @returns {User|undefined}
   */
  static firstOwner(doc) {
    /* null docs could mean an empty lookup, null docs are not owned by anyone */
    if (!doc) return undefined;

    /* while conceptually correct, tokens derive permissions from their
     * (synthetic) actor data.
     */
    const corrected = doc instanceof TokenDocument ? doc.actor :
                      // @ts-ignore 2589
                      doc instanceof Token ? doc.document.actor : doc;
    
    const ownershipPath = MODULE.isV10 ? 'ownership' : 'data.permission';

    const permissionObject = getProperty(corrected ?? {}, ownershipPath) ?? {};

    const playerOwners = Object.entries(permissionObject)
      .filter(([id, level]) => (!game.users.get(id)?.isGM && game.users.get(id)?.active) && level === 3)
      .map(([id, ]) => id);
    
    if (playerOwners.length > 0) {
      return game.users.get(playerOwners[0]);
    }

    /* if no online player owns this actor, fall back to first GM */
    return MODULE.firstGM();
  }

  /**
   * Checks whether the user calling this function is the user returned by 
   * {@link warpgate.util.firstOwner} when the function is passed the 
   * given document. Returns true if they are the same, false if they are not.
   * 
   * As `firstOwner`, biases towards players first.
   *
   * @returns {boolean} the current user is the first player owner. If no owning player, first GM.
   */
  static isFirstOwner(doc) {
    return game.user.id === MODULE.firstOwner(doc).id;
  }

  /**
   * Helper function. Waits for a specified amount of time in milliseconds (be sure to await!). 
   * Useful for timings with animations in the pre/post callbacks.
   * 
   * @param {Number} ms Time to delay, in milliseconds
   * @returns Promise
   */
  static async wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  static async waitFor(fn, maxIter = 600, iterWaitTime = 100, i = 0) {
    const continueWait = (current, max) => {

      /* negative max iter means wait forever */
      if (maxIter < 0) return true;

      return current < max;
    }

    while (!fn(i, ((i * iterWaitTime) / 100)) && continueWait(i, maxIter)) {
      i++;
      await MODULE.wait(iterWaitTime);
    }
    return i === maxIter ? false : true;
  }

  static settings() {

  }

  static applySettings(settingsData) {
    Object.entries(settingsData).forEach(([key, data]) => {
      game.settings.register(
        MODULE.data.name, key, {
          name: MODULE.localize(`setting.${key}.name`),
          hint: MODULE.localize(`setting.${key}.hint`),
          ...data
        }
      );
    });
  }

  static async getTokenData(actorNameDoc, tokenUpdates) {

    let sourceActor = actorNameDoc;
    if(typeof actorNameDoc == 'string') {
      /* lookup by actor name */
      sourceActor = game.actors.getName(actorNameDoc);
    }

    //get source actor
    if (!sourceActor) {
      logger.error(`Could not find world actor named "${actorNameDoc}" or no souce actor document provided.`);
      return false;
    }

    //get prototoken data -- need to prepare potential wild cards for the template preview
    let protoData = MODULE.isV10 ? (await sourceActor.getTokenDocument(tokenUpdates)) : (await sourceActor.getTokenData(tokenUpdates));
    if (!protoData) {
      logger.error(`Could not find proto token data for ${sourceActor.name}`);
      return false;
    }

    return protoData;
  }

  static updateProtoToken(protoToken, changes) {
      if ( MODULE.isV10 ) protoToken.updateSource(changes);
      else protoToken.update(changes);
  }

  static getMouseStagePos() {
    const mouse = canvas.app.renderer.plugins.interaction.mouse;
    return mouse.getLocalPosition(canvas.app.stage);
  }

  static shimUpdate(updates) {
    if(MODULE.isV10) {

      updates.token = MODULE.shimClassData(TokenDocument.implementation, updates.token);
      updates.actor = MODULE.shimClassData(Actor.implementation, updates.actor);

      Object.keys(updates.embedded ?? {}).forEach( (embeddedName) => {
        const cls = CONFIG[embeddedName].documentClass;

        Object.entries(updates.embedded[embeddedName]).forEach( ([shortId, data]) => {
          updates.embedded[embeddedName][shortId] = (typeof data == 'string') ? data : MODULE.shimClassData(cls, data);
        });
      });

    }

    return updates;
  }

  static shimClassData(cls, change) {

    if(!change) return change;

    if(MODULE.isV10 && !!change && !foundry.utils.isEmpty(change)) {
      /* shim data if needed */
      return cls.migrateData(foundry.utils.expandObject(change));
    }

    return foundry.utils.expandObject(change);
  }

  static getFeedbackSettings({alwaysAccept = false, suppressToast = false} = {}) {
    const acceptSetting = MODULE.setting('alwaysAcceptLocal') == 0 ? 
      MODULE.setting('alwaysAccept') :
      {1: true, 2: false}[MODULE.setting('alwaysAcceptLocal')];

    const accepted = !!alwaysAccept ? true : acceptSetting;

    const suppressSetting = MODULE.setting('suppressToastLocal') == 0 ? 
      MODULE.setting('suppressToast') :
      {1: true, 2: false}[MODULE.setting('suppressToastLocal')];

    const suppress = !!suppressToast ? true : suppressSetting;

    return {alwaysAccept: accepted, suppressToast: suppress};

  }

  /**
   * Collects the changes in 'other' compared to 'base'.
   * Also includes "delete update" keys for elements in 'base' that do NOT
   * exist in 'other'.
   */
  static strictUpdateDiff(base, other) {
    /* get the changed fields */
    const diff = foundry.utils.flattenObject(foundry.utils.diffObject(base, other, {inner: true}));

    /* get any newly added fields */
    const additions = MODULE.unique(flattenObject(base), flattenObject(other))

    /* set their data to null */
    Object.keys(additions).forEach( key => {
      if( typeof additions[key] != 'object' ) diff[key] = null
    });

    return foundry.utils.expandObject(diff);
  }

  static unique(object, remove) {
    // Validate input
    const ts = getType(object);
    const tt = getType(remove);
    if ((ts !== "Object") || (tt !== "Object")) throw new Error("One of source or template are not Objects!");

    // Define recursive filtering function
    const _filter = function (s, t, filtered) {
      for (let [k, v] of Object.entries(s)) {
        let has = t.hasOwnProperty(k);
        let x = t[k];

        // Case 1 - inner object
        if (has && (getType(v) === "Object") && (getType(x) === "Object")) {
          filtered[k] = _filter(v, x, {});
        }

        // Case 2 - inner key
        else if (!has) {
          filtered[k] = v;
        }
      }
      return filtered;
    };

    // Begin filtering at the outer-most layer
    return _filter(object, remove, {});
  }

  /**
   * Helper function for quickly creating a simple dialog with labeled buttons and associated data. 
   * Useful for allowing a choice of actors to spawn prior to `warpgate.spawn`.
   *
   * @param {Object} data 
   * @param {Array<{label: string, value:*}>} data.buttons
   * @param {string} [data.title]
   * @param {string} [data.content]
   * @param {Object} [data.options]
   *
   * @param {string} [direction = 'row'] 'column' or 'row' accepted. Controls layout direction of dialog.
   */
  static async buttonDialog(data, direction = 'row') {
    return await new Promise(async (resolve) => {
      /** @type Object<string, object> */
      let buttons = {},
        dialog;

      data.buttons.forEach((button) => {
        buttons[button.label] = {
          label: button.label,
          callback: () => resolve(button.value)
        }
      });

      dialog = new Dialog({
        title: data.title ?? '',
        content: data.content ?? '',
        buttons,
        close: () => resolve(false)
      }, {
        /*width: '100%',*/
        height: '100%',
        ...data.options
      });

      await dialog._render(true);
      dialog.element.find('.dialog-buttons').css({
        'flex-direction': direction
      });
    });
  }

  static dialogInputs = (data) => {
    const content = `
      <table style="width:100%">
      ${data.map(({type, label, value, options}, i) => {
        if (type.toLowerCase() === 'button') { return '' }
        if (type.toLowerCase() === 'header') {
            return `<tr><td colspan = "2"><h2>${label}</h2></td></tr>`;
        } else if (type.toLowerCase() === 'info') {
          return `<tr><td colspan="2">${label}</td></tr>`;
        } else if (type.toLowerCase() === `select`) {
          return `<tr><th style="width:50%"><label>${label}</label></th><td style="width:50%"><select id="${i}qd">${options.map((e) => `<option value="${e}">${e}</option>`).join(``)}</td></tr>`;
        } else if (type.toLowerCase() == `radio`) {
          return `<tr><th style="width:50%"><label>${label}</label></th><td style="width:50%"><input type="${type}" id="${i}qd" ${(options instanceof Array ? options[1] : false ?? false) ? 'checked' : ''} value="${value ?? label}" name="${options instanceof Array ? options[0] : options ?? 'radio'}"/></td></tr>`;
        } else if (type.toLowerCase() === `checkbox` ) {
          return `<tr><th style="width:50%"><label>${label}</label></th><td style="width:50%"><input type="${type}" id="${i}qd" ${(options instanceof Array ? options[0] : options ?? false) ? 'checked' : ''} value="${value ?? label}"/></td></tr>`;
        } else {
          return `<tr><th style="width:50%"><label>${label}</label></th><td style="width:50%"><input type="${type}" id="${i}qd" value="${options instanceof Array ? options[0] : options}"/></td></tr>`;
        }
        }).join(``)
      } </table>`;

        return content;
  }
    static async dialog(data = {}, title = 'Prompt', submitLabel = 'Ok') {
      logger.warn(`'warpgate.dialog' is deprecated and will be removed in version 2.2.0. See 'warpgate.menu' as a replacement.`);
      data = data instanceof Array ? data : [data];

      const results = await warpgate.menu({inputs: data}, {title, defaultButton: submitLabel});
      if(results.buttons === false) return false;
      return results.inputs;
    }

    /**
     * Advanced dialog helper providing multiple input type options as well as user defined buttons.
     *
     * | `type` | `options` | Return Value | Notes |
     * |--|--|--|--|
     * | header | none | undefined | Shortcut for `info | <h2>text</h2>`. |
     * | info   | none | undefined | Inserts a line of text for display/informational purposes. |
     * | text | default value | {String} final value of text field | |
     * | password | (as `text`) | (as `text`) | Characters are obscured for security. |
     * | radio | [group name, default state (`false`)] {Array of String/Bool} | selected: {Class<Primitive>} `value`. un-selected: {Boolean} `false` | For a given group name, only one radio button can be selected. |
     * | checkbox | default state (`false`) {Boolean} | {Boolean} `value`/`false` checked/unchecked | `label` is used for the HTML element's `name` property |
     * | number | (as `text`) | {Number} final value of text field converted to a number |
     * | select | array of option labels | {String} label of choice | | 
     * @static
     * @param {object} [data]  
     * @param {Array<{label: string, type: string, options: any|Array<any>} >} [data.inputs=[]] follow the same structure as dialog
     * @param {Array<{label: string, value: any}>} [data.buttons=[]] as buttonDialog
     * @param {object} [config] 
     * @param {string} [config.title='Prompt'] Title of dialog
     * @param {string} [config.defaultButton='Ok'] default button label if no buttons provided
     * @param {function(HTMLElement) : void} [config.render=undefined]
     * @param {Function} [config.close = (resolve) => resolve({buttons: false})]
     * @param {object} [config.options = {}] Options passed to the Dialog constructor
     *
     * @return {Promise<{ inputs: Array<any>, buttons: any}>} Object with `inputs` containing the chosen values for each provided input,
     *   in order, and the provided `value` of the pressed button, or `false` if closed.
     *
     * @example
     * await warpgate.menu({
     *  inputs: [{
     *    label: 'My Way',
     *    type: 'radio',
     *    options: 'group1'
     *  }, {
     *    label: 'The Highway',
     *    type: 'radio',
     *    options: 'group1'
     *  }],
     *  buttons: [{
     *    label: 'Yes',
     *    value: 1
     *  }, {
     *    label: 'No',
     *    value: 2
     *  }, {
     *    label: 'Maybe',
     *    value: 3
     *  }, {
     *    label: 'Eventually',
     *    value: 4
     *  }]
     * }, {
     *  options: {
     *    width: '100px',
     *    height: '100%'
     *  }
     * })
     *
     */
    static async menu({
      inputs = [],
      buttons = []
    } = {}, {
      title = 'Prompt',
      defaultButton = 'Ok',
      render,
      close = (resolve) => resolve({buttons: false}),
      options = {}
    } = {}) {

      return await new Promise((resolve) => {
        let content = MODULE.dialogInputs(inputs);
        /** @type Object<string, object> */
        let buttonData = {}

        buttons.forEach((button) => {
          buttonData[button.label] = {
            label: button.label,
            callback: (html) => {
              const results = {
                inputs: MODULE._innerValueParse(inputs, html),
                buttons: button.value
              }
              if(button.callback instanceof Function) button.callback(results, button, html); 
              resolve(results);
            }
          }
        });

        /* insert standard submit button if none provided */
        if (buttons.length < 1) {
          buttonData = {
            Ok: {
              label: defaultButton,
              callback: (html) => resolve({inputs: MODULE._innerValueParse(inputs, html), buttons: true})
            }
          }
        }

        new Dialog({
          title,
          content,
          close: (...args) => close(resolve, ...args),
          buttons: buttonData,
          render,
        }, {focus: true, ...options}).render(true);
      });
    }

    static _innerValueParse(data, html) {
      return Array(data.length).fill().map((e, i) => {
        let {
          type
        } = data[i];
        if (type.toLowerCase() === `select`) {
          return html.find(`select#${i}qd`).val();
        } else {
          switch (type.toLowerCase()) {
            case `text`:
            case `password`:
              return html.find(`input#${i}qd`)[0].value;
            case `radio`:
            case `checkbox`:
              return html.find(`input#${i}qd`)[0].checked ? html.find(`input#${i}qd`)[0].value : false;
            case `number`:
              return html.find(`input#${i}qd`)[0].valueAsNumber;
          }
        }
      })
    }
  }

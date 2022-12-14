import {SharedConsts} from "../shared/SharedConsts.js";
import {UtilApplications} from "./UtilApplications.js";
import {ImportListCreature} from "./ImportListCreature.js";
import {NamedTokenCreator} from "./NamedTokenCreator.js";
import {UtilHooks} from "./UtilHooks.js";
import {UtilActors} from "./UtilActors.js";
import {ChooseImporter} from "./ChooseImporter.js";
import {ImportListSpell} from "./ImportListSpell.js";
import {Config} from "./Config.js";
import {Vetools} from "./Vetools.js";
import {UtilFolders} from "./UtilFolders.js";
import {UtilImage} from "./UtilImage.js";
import {UtilTokens} from "./UtilTokens.js";
import {UtilLibWrapper} from "./PatcherLibWrapper.js";
import {ModuleMacro} from "./ModuleMacro.js";

class Api {
	static _API = {
		importer: {
			pOpen: ChooseImporter.api_pOpen.bind(ChooseImporter),
			pImportAll: ChooseImporter.api_pImportAll.bind(ChooseImporter),
			creature: {
				pImportEntry: ImportListCreature.api_pImportEntry.bind(ImportListCreature),
			},
			spell: {
				pImportEntry: ImportListSpell.api_pImportEntry.bind(ImportListSpell),
			},
		},
		token: {
			pCreateToken: NamedTokenCreator.pCreateToken.bind(NamedTokenCreator),
		},
		util: {
			apps: {
				doAutoResize: UtilApplications.autoResizeApplication.bind(UtilApplications),
				$getAppElement: UtilApplications.$getAppElement.bind(UtilApplications),
				pAwaitAppClose: UtilApplications.pAwaitAppClose.bind(UtilApplications),
			},
			actors: {
				isImporterTempActor: UtilActors.isImporterTempActor.bind(UtilActors),
			},
			tokens: {
				getTokenDimensionsAndScale: UtilTokens.getTokenDimensionsAndScale.bind(UtilTokens),
			},
			requests: {
				getWithCache: Vetools.pGetWithCache.bind(Vetools),
				pSaveImageToServerAndGetUrl: Vetools.pSaveImageToServerAndGetUrl.bind(Vetools),
			},
			folders: {
				pCreateFoldersGetId: UtilFolders.pCreateFoldersGetId.bind(UtilFolders),
			},
			image: {
				pLoadTempImage: UtilImage.pLoadTempImage.bind(UtilImage),
			},
		},
		hooks: {
			on: UtilHooks.on.bind(UtilHooks),
			off: UtilHooks.off.bind(UtilHooks),
		},
		moduleMacro: {
			importToSelectedTokens: ModuleMacro.api_importToSelectedTokens.bind(ModuleMacro),
			createNamedToken: ModuleMacro.api_createNamedToken.bind(ModuleMacro),
		},
		config: {
			getWikiSummary: Config.api_getWikiSummary.bind(Config),
			getWikiSummaryMarkdown: Config.api_getWikiSummaryMarkdown.bind(Config),
		},
	};

	static init () {
		this._init_addFakeModule();

		UtilLibWrapper.addPatch(
			"ModuleManagement.prototype.getData",
			this._lw_ModuleManagement_prototype_getData,
			UtilLibWrapper.LIBWRAPPER_MODE_WRAPPER,
		);
	}

	/** Expose the API under the "srd5e" namespace. */
	static _init_addFakeModule () {
		const clone = new Module(game.modules.get(SharedConsts.MODULE_NAME).toObject());

		game.modules.get(SharedConsts.MODULE_NAME).api = Api._API;

		clone.id = SharedConsts.MODULE_NAME_FAKE;
		clone.api = Api._API;

		game.modules.set(SharedConsts.MODULE_NAME_FAKE, clone);
	}

	static _lw_ModuleManagement_prototype_getData (fn, ...args) {
		const clone = game.modules.get(SharedConsts.MODULE_NAME);
		game.modules.delete(SharedConsts.MODULE_NAME_FAKE);

		const out = fn(...args);

		game.modules.set(SharedConsts.MODULE_NAME_FAKE, clone);

		return out;
	}
}

export {Api};

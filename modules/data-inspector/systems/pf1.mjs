// Example filters

/**
 * Supplement temporary document data creation.
 *
 * @param {Actor|Item} doc Original document.
 * @param {Object} data Data used to create temporary document.
 */
function supplementTemporaryData(doc, data) {
	const v10 = game.release.generation >= 10,
		docData = v10 ? doc.system : doc.data.data,
		prefix = v10 ? 'system' : 'data';

	if (doc instanceof Actor) {
		switch (doc.type) {
			case 'character':
				break;
			case 'npc':
				break;
		}
	}
	else if (doc instanceof Item) {
		// Add item subtype based on item being compared to.
		switch (doc.type) {
			case 'weapon':
				data[prefix].weaponType = docData.weaponType;
				data[prefix].weaponSubtype = docData.weaponSubtype;
				break;
			case 'attack':
				data[prefix].attackType = docData.attackType;
				break;
			case 'spell':
				data[prefix].spellbook = docData.spellbook;
				break;
			case 'buff':
				data[prefix].buffType = docData.buffType;
				break;
			case 'feat':
				data[prefix].featType = docData.featType;
				break;
			case 'equipment':
				data[prefix].equipmentType = docData.equipmentType;
				data[prefix].equipmentSubtype = docData.equipmentSubtype;
				break;
			case 'consumable':
				data[prefix].consumableType = docData.consumableType;
				break;
			case 'loot':
				data[prefix].subType = docData.subType;
				break;
			case 'container':
				break;
		}
	}
}

/**
 * @param {Document} doc
 * @param {String} path
 * @param {"rolldata"|"source"|"derived"} mode
 */
function filterData(doc, path, mode) {
	if (game.user.isGM) return;

	if (mode === 'rolldata') return;

	const v10 = game.release.generation >= 10,
		docData = v10 ? doc.system : doc.data.data,
		prefix = v10 ? 'system' : 'data';

	if (doc instanceof Item) {
		const isIdentified = docData.identified === true;

		switch (doc.type) {
			case 'weapon':
			case 'equipment':
			case 'consumable':
			case 'loot':
			case 'container': {
				// Omit data that may be secret
				const idPaths = [
					`${prefix}.identified`,
					`${prefix}.identifiedName`,
					`${prefix}.unidentifiedName`,
					`${prefix}.description.unidentified`,
					`${prefix}.description.value`,
					`${prefix}.unidentified.name`,
					`${prefix}.unidentified.price`,
				];
				if (!isIdentified && idPaths.includes(path))
					return false;
				break;
			}
		}
	}
}

Hooks.on('data-inspector.temporaryData', supplementTemporaryData);
Hooks.on('data-inspector.filterData', filterData);

# Change Log

## 3.1.0

- Fix: Swapping modes to and from roll data causes selected path to be formatted poorly with v10.
- Fix: Roll data mode was incorrectly identified, causing some odd behaviour.
- New release mechanism for smaller download & install sizes.

## 3.0.0

- Fix: Parent actor detection was incorrect for most systems.
- New: Override view, showing unlinked token overrides to the source actor.
- New: Foundry v10 compatibility.

## 2.2.1

- Internal: Less swapped for SCSS.
- Internal: Bundling with esbuild for faster loading.

## 2.2.0

- Added infinite loop guard for data recursion.
- Fix: Document and DocumentData found in data caused infinite loops.
- Slightly better handling of `Map`.

## 2.1.0

- New: Allow editing some unsupported types. Delete only.
- New: Source mode displays if the values are present in temporary document of same type.
  - This potentially allows you to see if you have data cruft, though this is not reliable for that, the extra data can be intentional.
- New: Hooks for enhancing how the module behaves:
  - `data-inspector.temporaryData` (document, data): For creating temporary document for data comparison. Modify data parameter to supplement document creation.
  - `data-inspector.filterData` (document, path, mode): Return false if the data at stated path should not be displayed. This is meant for dealing with secret data.
- New: The module functionality can be limited to GMs. By default users are allowed.
- Changed: Search index is built only on demand.
- New: Custom tooltips with more information and faster responsiviness.

## 2.0.0.1

- Fix: Bad data type notification displays with human readable type.
- Fix: Data sorting.

## 2.0.0

- New: Simple limited value editing and deletion interface accessible in source view. Requires this is enabled in module settings.
- New: Basic API accessible via `game.modules.get('data-inspector').api`
- New: Booleans are identified better with checkboxes to display their state.
- New: Object entries are sorted.
- New: Result quality slider to allow greater or lesser number of matches to be shown than the default when searching.
- New: Default mode can be chosen.
- New: Default inclusion of functions can be toggled.
- New: Default result quality setting can be chosen.
- Changed: Some data types are no longer icluded in the tree expansion, such as Item and Actor instances. This is to prevent infinite loops or other similar problems.
- Changed: Empty strings are treated the same as null/undefined values, fading them.
- Fixed: Dialog failing to open for systems that don't provide roll data.

## 1.2.0

- Improved: Search is better at matching good results and actually finds them.
- Improved: Header layout.

## 1.1.0

- Fixed: Bad handling of arrays.
- New: Class name is stated instead of generic object value for classes.
- New: Function listing added, adding both getters and actual functions to the data listing.
  - Getters can be resolved by clicking on their value.
- Changed: Values are colored per type and strings are surrounded with double quotes to make them all more distinct.

## 1.0.0 Initial release

- Standalone module

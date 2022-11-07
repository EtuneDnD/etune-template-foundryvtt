# Koboldworks – Data Inspector

Simple inspection tool for actor and item data.

The dialog has 3 modes:

- **Roll Data**... for inspecting data accessible by formulas or anything else fed to _Roll_.
- **Derived Data**... which is the raw actor/item data as the system, macros and modules see it.
- **Source Data**... the permanently stored data, mostly useful for system and module development, or anything that interacts with the permanently stored data.
- **Override Data**... data overrides to source actor in unlinked tokens.

## API

Simple API is exposed to give access to the inspector even in cases where sheets are nonfunctional, or for any other need where the sheet is undesirable or not easily accessible.

```js
const di = game.modules.get('data-inspector')
di.api?.inspect(item) // Inspect Item document
di.api?.inspect(actor) // Inspect Actor document
```

For example, this allows following in debug console:

```js
game.modules.get('data-inspector').api.inspect(_token.actor)
```

## Screenshots

![Actor Selection](./img/screencaps/selection.png)

![Item Search](./img/screencaps/search.png)

## Flaws

- This does not hide secret data.

## Install

Manifest URL: <https://gitlab.com/koboldworks/agnostic/data-inspector/-/releases/permalink/latest/downloads/module.json>

## Attribution

If you use any of the code in this project, I would appreciate I or the project was credited for inspiration or whatever where appropriate. Or just drop a line about using my code. I do not mind not having this, but it's just nice knowing something has come out of my efforts.

## Donations

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/I2I13O9VZ)

## License

This software is distributed under the [MIT License](./LICENSE).

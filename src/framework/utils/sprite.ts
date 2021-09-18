import * as PIXI from "pixi.js";

/**
 * リソース読み込み済みSpriteを返す
 */
export class Sprite extends PIXI.Sprite {
  constructor(resource: string, name: string | number) {
    const sheet = PIXI.Loader.shared.resources[resource].spritesheet;
    if (sheet) {
      super(sheet.textures[name]);
    } else {
      throw new Error("LoadError: " + resource);
    }
  }
}

import UpdateObject from "framework/interfaces/updateObject";
import { Sprite } from "framework/utils/sprite";
import { ASSET_NAME, ASSET_RESOURCES } from "resources/resource";
import { DisplayObject } from "pixi.js";
import * as PIXI from "pixi.js";

/**
 * キャラ
 */
export class Chara extends Sprite implements UpdateObject {
  public isUpdate = true;
  private _currentF = 0;
  private _updateF = 30;
  private _currentNum = 1;
  private _isNumUp = true;
  private _sheet: PIXI.Spritesheet;

  constructor() {
    super(ASSET_RESOURCES.animations.chara, ASSET_NAME.chara.default);
    const sheet =
      PIXI.Loader.shared.resources[ASSET_RESOURCES.animations.chara]
        .spritesheet;
    if (sheet) {
      this._sheet = sheet;
    }
  }

  public init(): void {
    this.width = 128;
    this.height = 128;
  }

  public isUpdating(): boolean {
    return this.isUpdate;
  }

  public update(_dt: number): void {
    if (this._currentF % this._updateF === 0) {
      if (this._isNumUp) {
        if (this._currentNum == 3) {
          this._isNumUp = false;
          this._currentNum--;
        } else {
          this._currentNum++;
        }
      } else {
        if (this._currentNum == 1) {
          this._isNumUp = true;
          this._currentNum++;
        } else {
          this._currentNum--;
        }
      }
      const name = "right_0" + this._currentNum;
      this.texture = this._sheet.textures[name];
    }
    this._currentF++;
  }

  public removeDisplayObject(): DisplayObject | undefined {
    return undefined;
  }
}

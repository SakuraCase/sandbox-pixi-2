import GameManager from "framework/gameManager";
import { Container, Graphics } from "pixi.js";

/**
 * PointerEventが反応しないようにするための透明Container
 */
export class PointerEventLockConteiner extends Container {
  private _fullScreen: Graphics;
  constructor() {
    super();
    this.zIndex = 100;
    this.name = "PointerEventLockConteiner";

    this._fullScreen = new Graphics()
      .beginFill()
      .drawRect(
        0,
        0,
        GameManager.instance.game.renderer.width,
        GameManager.instance.game.renderer.height
      )
      .endFill();
    this._fullScreen.alpha = 0;
    this._fullScreen.interactive = true;
    this.addChild(this._fullScreen);
  }
}

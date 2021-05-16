import * as PIXI from "pixi.js";
import View from "framework/View";
import GameManager from "framework/GameManager";
import { Container, Graphics, Text } from "pixi.js";
import { SampleView } from "./SampleView";
import { NeumorphismTestPresenter } from "main/presenters/NeumorphismTestPresenter";

/**
 * Sampleビュー
 */
export class NeumorphismTestView extends View {
  private _neumorphismContainer: Container;
  private _base;
  private _top;
  private _bottom;
  private _state = 0;
  private _isUp = true;
  private _count = 0;
  private _topColor = [16, 153, 187];
  private _bottomColor = [16, 153, 187];
  // private _shadowColor = [14, 138, 168];
  // private _baseColor = [16, 153, 187];
  // private _lightColor = [18, 168, 206];
  private _filter = new PIXI.filters.BlurFilter();

  /**
   * コンストラクタ
   */
  constructor() {
    super();
    this.presenter = new NeumorphismTestPresenter(this);
    this._neumorphismContainer = new Container();
    this._base = new Graphics();
    this._base.beginFill(0x1099bb).drawRect(0, 0, 200, 200).endFill();
    this._top = new Graphics().beginFill(0x1099bb).drawRect(8, 8, 200, 200);
    this._bottom = new Graphics()
      .beginFill(0x1099bb)
      .drawRect(-8, -8, 200, 200);
    this._neumorphismContainer.addChild(this._top);
    this._neumorphismContainer.addChild(this._bottom);
    this._neumorphismContainer.addChild(this._base);
    this._filter.blur = 8;
    this._base.filters = [this._filter];
    this._top.filters = [this._filter];
    this._bottom.filters = [this._filter];
    this._neumorphismContainer.position.set(500, 300);
    this.addChild(this._neumorphismContainer);

    const text = new Text("Sampleへ", {
      fontSize: 20,
      fill: 0xffffff,
    });

    text.interactive = true;
    text.buttonMode = true;
    text.anchor.set(0, 0.5);
    text.position.set(200, 200);

    text.on("pointerdown", () => {
      GameManager.instance.loadView(new SampleView());
    });

    this.addChild(text);
    const containerUp = this.createNeumorphismUpContainer();
    containerUp.position.set(200, 300);
    this.addChild(containerUp);

    const containerDown = this.createNeumorphismDownContainer();
    containerDown.position.set(200, 600);
    this.addChild(containerDown);
  }

  public createNeumorphismUpContainer(): Container {
    const container = new Container();
    const base = new Graphics().beginFill(0x1099bb).drawRect(0, 0, 200, 200);
    const shadow = new Graphics().beginFill(0x0e8aa8).drawRect(8, 8, 200, 200);
    const light = new Graphics().beginFill(0x12a8ce).drawRect(-8, -8, 200, 200);
    const filter = new PIXI.filters.BlurFilter();
    filter.blur = 16;
    shadow.filters = [filter];
    light.filters = [filter];

    container.addChild(shadow);
    container.addChild(light);
    container.addChild(base);

    return container;
  }

  public createNeumorphismDownContainer(): Container {
    const container = new Container();
    const base = new Graphics().beginFill(0x1099bb).drawRect(0, 0, 200, 200);
    const shadow = new Graphics()
      .beginFill(0x0e8aa8)
      .drawRect(-8, -8, 200, 200);
    const light = new Graphics().beginFill(0x12a8ce).drawRect(8, 8, 200, 200);
    const filter = new PIXI.filters.BlurFilter();
    filter.blur = 8;
    shadow.filters = [filter];
    light.filters = [filter];
    base.filters = [filter];

    container.addChild(shadow);
    container.addChild(light);
    container.addChild(base);

    return container;
  }

  public reDraw(): void {
    this._top
      .clear()
      .beginFill(this.toHex(this._topColor))
      .drawRect(8, 8, 200, 200);
    this._bottom
      .clear()
      .beginFill(this.toHex(this._bottomColor))
      .drawRect(-8, -8, 200, 200);
  }

  public toHex(rgb: number[]): number {
    // 1桁の場合0埋め必要だけど、今回はないので省略
    return parseInt(
      "0x" + rgb[0].toString(16) + rgb[1].toString(16) + rgb[2].toString(16)
    );
  }

  /**
   * 毎フレームの更新処理
   */
  public update(dt: number): void {
    super.update(dt);
    this._count++;

    if ((this._state == 1 && this._isUp) || (this._state == -1 && this._isUp)) {
      if (this._count % 100 == 0) {
        this._topColor[0] += 1;
        this._bottomColor[0] -= 1;
      }
      if (this._count % 10 == 0) {
        this._topColor[1] += 1;
        this._topColor[2] += 1;
        this._bottomColor[1] -= 1;
        this._bottomColor[2] -= 1;
      }
    }
    if (
      (this._state == 1 && !this._isUp) ||
      (this._state == -1 && !this._isUp)
    ) {
      if (this._count % 100 == 0) {
        this._topColor[0] -= 1;
        this._bottomColor[0] += 1;
      }
      if (this._count % 10 == 0) {
        this._topColor[1] -= 1;
        this._topColor[2] -= 1;
        this._bottomColor[1] += 1;
        this._bottomColor[2] += 1;
      }
    }
    this.reDraw();

    if (this._count % 200 == 0) {
      console.log("--- 200");
      console.log("current: ", this._state);
      console.log(this._topColor);
      console.log(this._bottomColor);
      if (this._state == 2) {
        this._isUp = false;
        this._state = 1;
      } else if (this._state == 1) {
        if (this._isUp) {
          this._state = 2;
        } else {
          this._state = 0;
        }
      } else if (this._state == 0) {
        if (this._isUp) {
          this._state = 1;
        } else {
          this._state = -1;
        }
      } else if (this._state == -1) {
        if (this._isUp) {
          this._state = 0;
        } else {
          this._state = -2;
        }
      } else if (this._state == -2) {
        this._isUp = true;
        this._state = -1;
      }
      console.log("next: ", this._state);
    }
  }
}

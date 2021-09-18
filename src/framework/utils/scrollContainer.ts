import GameManager from "framework/gameManager";
import UpdateObject from "framework/interfaces/updateObject";
import View from "framework/view";
import {
  Container,
  DisplayObject,
  Graphics,
  InteractionEvent,
  Rectangle,
} from "pixi.js";

export class ScrollContainer extends Container implements UpdateObject {
  private _lastPointerY = 0;
  private _lastPointerX = 0;
  private _minPositionX = 0;
  private _minPositionY = 0;
  private _maxPositionX = 0;
  private _maxPositionY = 0;
  private _pointerupHackTime = 500;
  private _isPointerupHack = false;
  private _pointerdownTime = 0;
  private _pointerupHack: Graphics;

  constructor(
    private _isScrollX: boolean = true,
    private _isScrollY: boolean = true
  ) {
    super();
    this.sortableChildren = true;
    this._pointerupHack = new Graphics();
    this._pointerupHack.alpha = 0;
    this._pointerupHack.zIndex = 99;
    this._pointerupHack.interactive = false;
    this.addChild(this._pointerupHack);
  }

  set isScrollX(val: boolean) {
    this._isScrollX = val;
  }

  set isScrollY(val: boolean) {
    this._isScrollX = val;
  }

  /**
   * position調整
   */
  public setPosition(x: number, y: number): void {
    this.position.x = x;
    this.position.y = y;
    this._minPositionX = x;
    this._minPositionY = y;
  }

  /**
   * スクロールを設定する
   */
  // public setScroll(hitArea: Size, maxPosition: Position): void {
  public setScroll(x: number, y: number, width: number, height: number): void {
    this.interactive = true;
    this.hitArea = new Rectangle(0, 0, width, height);
    this._pointerupHack.beginFill().drawRect(0, 0, width, height).endFill();
    this._maxPositionX = x;
    this._maxPositionY = y;

    this.onScroll();
  }

  /**
   * スクロール対応
   */
  public onScroll(): void {
    this.on("pointerdown", this.onScrollStart.bind(this))
      .on("mouseupoutside", this.onScrollEnd.bind(this))
      .on("pointerup", this.onScrollEnd.bind(this));
  }

  /**
   * moveイベントの設定
   */
  private onScrollStart(e: InteractionEvent): void {
    this._lastPointerY = e.data.global.y;
    this._lastPointerX = e.data.global.x;

    const view: View | undefined = GameManager.instance.currentView;
    if (view) {
      this._pointerupHack.interactive = false;
      this._isPointerupHack = false;
      this._pointerdownTime = new Date().getTime();
      view.registerUpdatingObject(this);
    }

    e.currentTarget.on("pointermove", this.onMove.bind(this));
  }

  /**
   * 表示座標更新
   */
  private onMove(e: InteractionEvent): void {
    if (this._isScrollY) {
      this.onMoveY(e);
    }
    if (this._isScrollX) {
      this.onMoveX(e);
    }
  }

  /**
   * Y表示座標更新
   */
  private onMoveY(e: InteractionEvent): void {
    const y = e.data.global.y;
    const distance = y - this._lastPointerY;
    this._lastPointerY = e.data.global.y;
    e.currentTarget.position.y += distance;

    if (e.currentTarget.position.y > this._minPositionY) {
      e.currentTarget.position.y = this._minPositionY;
    } else if (e.currentTarget.position.y < -this._maxPositionY) {
      e.currentTarget.position.y = -this._maxPositionY;
    }
  }

  /**
   * X表示座標更新
   */
  private onMoveX(e: InteractionEvent): void {
    const x = e.data.global.x;
    const distance = x - this._lastPointerX;
    this._lastPointerY = e.data.global.x;
    e.currentTarget.position.x += distance;

    if (e.currentTarget.position.x > this._minPositionX) {
      e.currentTarget.position.x = this._minPositionX;
    } else if (e.currentTarget.position.x < -this._maxPositionX) {
      e.currentTarget.position.y = -this._maxPositionX;
    }
  }

  /**
   * moveイベント解除
   * isPointerupHack = trueに変更するのはhackしないときにisUpdatingの条件から外すため
   */
  private onScrollEnd(e: InteractionEvent): void {
    this._pointerupHack.interactive = false;
    this._isPointerupHack = true;
    this._pointerdownTime = 0;
    e.currentTarget.off("pointermove");
  }

  /**
   * スクロールとクリックイベント判別のための処理
   * pointerdownから_pointerupHackTime以上経過したらpointerupHackをtureにする
   */
  public update(_dt: number): void {
    const now = new Date();
    if (this._pointerupHackTime < now.getTime() - this._pointerdownTime) {
      this._isPointerupHack = true;
      this._pointerupHack.interactive = true;
    }
  }

  /**
   * pointerupHackが無効 かつ isPointerupHackがfalseな間はチェックし続ける
   * 通常時はカーソル変更を適用するため無効にして、pointerupTIme以上押されていたら有効にしたいためチェックの条件は逆
   */
  public isUpdating(): boolean {
    return !this._pointerupHack.interactive && !this._isPointerupHack;
  }
  public removeDisplayObject(): DisplayObject | undefined {
    return undefined;
  }
}

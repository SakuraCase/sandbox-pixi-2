/* eslint-disable @typescript-eslint/no-empty-function */
import * as PIXI from "pixi.js";
import Transition from "framework/interfaces/transition";
import UpdateObject from "framework/interfaces/updateObject";
import Immediate from "framework/containers/immediate";
import Presenter from "framework/presenter";
import { PointerEventLockConteiner } from "./containers/pointerEventLockConteiner";

/**
 * ゲームビューの抽象クラス
 * ビュー間のトランジションイベントを提供する
 * いずれのイベントも実装クラスにて独自処理の実装を行うことができる
 */
export default abstract class View extends PIXI.Container {
  /**
   * 経過フレーム数
   */
  protected elapsedFrameCount = 0;
  /**
   * 更新すべきオブジェクトを保持する
   */
  protected objectsToUpdate: UpdateObject[] = [];

  /**
   * ビュー開始用のトランジションオブジェクト
   */
  protected transitionIn: Transition = new Immediate();
  /**
   * ビュー終了用のトランジションオブジェクト
   */
  protected transitionOut: Transition = new Immediate();

  protected presenter!: Presenter;

  /**
   * ポインタイベント制御用オブジェクト
   */
  protected pointerEventLockConteiner: PointerEventLockConteiner =
    new PointerEventLockConteiner();

  constructor() {
    super();
    this.sortableChildren = true;
  }

  /**
   * GameManager によって requestAnimationFrame 毎に呼び出されるメソッド
   */
  public update(delta: number): void {
    this.elapsedFrameCount++;

    this.updateRegisteredObjects(delta);

    if (this.transitionIn.isActive()) {
      this.transitionIn.update(delta);
    } else if (this.transitionOut.isActive()) {
      this.transitionOut.update(delta);
    }
  }

  /**
   * 更新処理を行うべきオブジェクトとして渡されたオブジェクトを登録する
   */
  public registerUpdatingObject(...object: UpdateObject[]): void {
    this.objectsToUpdate.push(...object);
  }

  /**
   * 更新処理を行うべきオブジェクトを更新する
   */
  protected updateRegisteredObjects(delta: number): void {
    // 破棄されたオブジェクトを圧縮するために残存するオブジェクトのみを保持する
    const nextObjectsToUpdate = [];

    for (let i = 0; i < this.objectsToUpdate.length; i++) {
      const obj = this.objectsToUpdate[i];
      if (!obj || !obj.isUpdating()) {
        const displayObj = obj.removeDisplayObject();
        if (displayObj) {
          const container = displayObj.parent;
          if (container) {
            container.removeChild(displayObj);
          }
        }
        continue;
      }
      obj.update(delta);
      nextObjectsToUpdate.push(obj);
    }

    this.objectsToUpdate = nextObjectsToUpdate;
  }

  /**
   * ビュー追加トランジション開始
   * 引数でトランジション終了時のコールバックを指定できる
   */
  public beginTransitionIn(onTransitionFinished?: (view: View) => void): void {
    if (onTransitionFinished) {
      this.transitionIn.setCallback(() => onTransitionFinished(this));
    }

    const container = this.transitionIn.getContainer();
    if (container) {
      this.addChild(container);
    }

    this.transitionIn.begin();
  }

  /**
   * ビュー削除トランジション開始
   * 引数でトランジション終了時のコールバックを指定できる
   */
  public beginTransitionOut(onTransitionFinished: (view: View) => void): void {
    this.transitionOut.setCallback(() => onTransitionFinished(this));

    const container = this.transitionOut.getContainer();
    if (container) {
      this.addChild(container);
    }

    this.transitionOut.begin();
  }

  /**
   * ビュー切り替え時リソースロード
   */
  public beginLoadResource(onComplete: () => void): Promise<void> {
    return this.presenter.beginInitLoadResource(() => {}, onComplete);
  }

  /**
   * pointerEventが反応しないようにする
   */
  public lockPointerEvent(): void {
    if (!this.getChildByName(this.pointerEventLockConteiner.name)) {
      this.addChild(this.pointerEventLockConteiner);
    }
  }

  /**
   * pointerEventが反応するようにする
   */
  public unlockPointerEvent(): void {
    if (this.getChildByName(this.pointerEventLockConteiner.name)) {
      this.removeChild(this.pointerEventLockConteiner);
    }
  }
}

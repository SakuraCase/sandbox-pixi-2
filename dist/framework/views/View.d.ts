import * as PIXI from "pixi.js";
import Transition from "framework/interfaces/Transition";
import UpdateObject from "framework/interfaces/UpdateObject";
import Presenter from "framework/presenters/Presenter";
/**
 * ゲームビューの抽象クラス
 * ビュー間のトランジションイベントを提供する
 * いずれのイベントも実装クラスにて独自処理の実装を行うことができる
 */
export default abstract class View extends PIXI.Container {
    /**
     * 経過フレーム数
     */
    protected elapsedFrameCount: number;
    /**
     * 更新すべきオブジェクトを保持する
     */
    protected objectsToUpdate: UpdateObject[];
    /**
     * ビュー開始用のトランジションオブジェクト
     */
    protected transitionIn: Transition;
    /**
     * ビュー終了用のトランジションオブジェクト
     */
    protected transitionOut: Transition;
    protected presenter: Presenter;
    constructor();
    /**
     * GameManager によって requestAnimationFrame 毎に呼び出されるメソッド
     */
    update(delta: number): void;
    /**
     * 更新処理を行うべきオブジェクトとして渡されたオブジェクトを登録する
     */
    registerUpdatingObject(...object: UpdateObject[]): void;
    /**
     * 更新処理を行うべきオブジェクトを更新する
     */
    protected updateRegisteredObjects(delta: number): void;
    /**
     * ビュー追加トランジション開始
     * 引数でトランジション終了時のコールバックを指定できる
     */
    beginTransitionIn(onTransitionFinished?: (view: View) => void): void;
    /**
     * ビュー削除トランジション開始
     * 引数でトランジション終了時のコールバックを指定できる
     */
    beginTransitionOut(onTransitionFinished: (view: View) => void): void;
    beginLoadResource(onLoaded: () => void): Promise<void>;
}

import * as PIXI from "pixi.js";
import ApplicationOptions from "framework/interfaces/ApplicationOptions";
import DefaultViewManager from "main/DefaultViewManager";
/**
 * ゲーム全体のマネージャ
 */
export default class GameManager {
    /**
     * シングルトン新インスタンス
     */
    static instance: GameManager;
    /**
     * PIXI.Application インスタンス
     * 初期化時に生成される
     */
    game: PIXI.Application;
    /**
     * View遷移を管理するViewManagerインスタンス
     * framework外のクラスを参照している...
     */
    viewManager: DefaultViewManager;
    /**
     * コンストラクタ
     * PIXI.Application インスタンスはユーザ任意のものを使用する
     */
    constructor(app: PIXI.Application);
    /**
     * ゲームを起動する
     * 画面サイズや ApplicationOptions を渡すことができる
     */
    static start(params: {
        glWidth: number;
        glHeight: number;
        option?: ApplicationOptions;
    }): void;
    /**
     * フルスクリーンに切り替える
     */
    static requestFullScreen(): void;
    /**
     * HTML canvas のりサイズ処理を行う
     */
    static resizeCanvas(): void;
    /**
     * 動作環境に応じて適切ならフルスクリーン設定をする
     */
    private static enableFullScreenIfNeeded;
    /**
     * View遷移を管理するViewManagerを設定する
     */
    static initViewManager(newViewManager: DefaultViewManager): void;
}

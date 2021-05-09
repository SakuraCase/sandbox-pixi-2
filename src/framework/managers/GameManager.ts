/* eslint-disable @typescript-eslint/no-explicit-any */
import * as PIXI from "pixi.js";
import { detect } from "detect-browser";
import ApplicationOptions from "framework/interfaces/ApplicationOptions";
import CONFIG from "Config";
import IndexedDBManager from "framework/managers/IndexedDBManager";
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";
import DefaultViewManager from "main/DefaultViewManager";

/**
 * ゲーム全体のマネージャ
 */
export default class GameManager {
  /**
   * シングルトン新インスタンス
   */
  public static instance: GameManager;

  /**
   * PIXI.Application インスタンス
   * 初期化時に生成される
   */
  public game!: PIXI.Application;

  /**
   * View遷移を管理するViewManagerインスタンス
   * framework外のクラスを参照している...
   */
  public viewManager!: DefaultViewManager;

  /**
   * コンストラクタ
   * PIXI.Application インスタンスはユーザ任意のものを使用する
   */
  constructor(app: PIXI.Application) {
    if (GameManager.instance) {
      throw new Error("GameManager can be instantiate only once");
    }
    gsap.registerPlugin(PixiPlugin);
    PixiPlugin.registerPIXI(app);
    this.game = app;
  }

  /**
   * ゲームを起動する
   * 画面サイズや ApplicationOptions を渡すことができる
   */
  public static start(params: {
    glWidth: number;
    glHeight: number;
    option?: ApplicationOptions;
  }): void {
    const appOption = Object.assign(
      {
        width: params.glWidth,
        height: params.glHeight,
      },
      params.option
    );
    // PIXI Application 生成
    const game = new PIXI.Application(appOption);
    PIXI.Loader.shared.baseUrl = CONFIG.RESOURCE_BASE_URL;
    // GameManager インスタンス生成
    const instance = new GameManager(game);
    GameManager.instance = instance;

    // IndexedDB初期化
    IndexedDBManager.init();

    // canvas を DOM に追加
    document.body.appendChild(game.view);

    // リサイズイベントの登録
    window.addEventListener("resize", GameManager.resizeCanvas);
    // サイズ初期化
    GameManager.resizeCanvas();

    // 必要であればフルスクリーンの有効化
    GameManager.enableFullScreenIfNeeded();

    // メインループ
    game.ticker.stop();
    gsap.ticker.add(() => {
      game.ticker.update();
    });
    game.ticker.add((delta: number) => {
      if (instance.viewManager) {
        const view = instance.viewManager.getCurrentView();
        if (view) {
          view.update(delta);
        }
      }
    });
  }

  /**
   * フルスクリーンに切り替える
   */
  public static requestFullScreen(): void {
    const body = window.document.body as any;
    const requestFullScreen =
      body.requestFullScreen || body.webkitRequestFullScreen;
    requestFullScreen.call(body);
  }

  /**
   * HTML canvas のりサイズ処理を行う
   */
  public static resizeCanvas(): void {
    const game = GameManager.instance.game;
    const renderer = game.renderer;

    let canvasWidth;
    let canvasHeight;

    const rendererHeightRatio = renderer.height / renderer.width;
    const windowHeightRatio = window.innerHeight / window.innerWidth;

    // 画面比率に合わせて縦に合わせるか横に合わせるか決める
    if (windowHeightRatio > rendererHeightRatio) {
      canvasWidth = window.innerWidth;
      canvasHeight = window.innerWidth * (renderer.height / renderer.width);
    } else {
      canvasWidth = window.innerHeight * (renderer.width / renderer.height);
      canvasHeight = window.innerHeight;
    }

    game.view.style.width = `${canvasWidth}px`;
    game.view.style.height = `${canvasHeight}px`;
  }

  /**
   * 動作環境に応じて適切ならフルスクリーン設定をする
   */
  private static enableFullScreenIfNeeded(): void {
    const browser = detect();
    // iOS は対応していないが一応記述しておく
    if (browser && (browser.os === "iOS" || browser.os === "Android OS")) {
      const type = typeof document.ontouchend;
      const eventName = type === "undefined" ? "mousedown" : "touchend";
      document.body.addEventListener(eventName, GameManager.requestFullScreen);
    }
  }

  /**
   * View遷移を管理するViewManagerを設定する
   */
  public static initViewManager(newViewManager: DefaultViewManager): void {
    const instance = GameManager.instance;
    instance.viewManager = newViewManager;
  }
}

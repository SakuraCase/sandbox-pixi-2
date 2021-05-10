import View from "framework/View";
import GameManager from "framework/GameManager";
import { SamplePresenter } from "main/presenters/SamplePresenter";
import { Text } from "pixi.js";
import { SampleView2 } from "./SampleView2";
import { LockTestView } from "./LockTestView";

/**
 * Sampleビュー
 */
export class SampleView extends View {
  /**
   * コンストラクタ
   */
  constructor() {
    super();
    this.presenter = new SamplePresenter(this);

    const text = new Text("Sample2へ", {
      fontSize: 20,
      fill: 0xffffff,
    });
    text.interactive = true;
    text.buttonMode = true;
    text.anchor.set(0, 0.5);
    text.position.set(200, 200);
    text.on("pointerdown", () => {
      GameManager.instance.loadView(new SampleView2());
    });
    this.addChild(text);

    const lockTest = new Text("lockTestへ", {
      fontSize: 20,
      fill: 0xffffff,
    });
    lockTest.interactive = true;
    lockTest.buttonMode = true;
    lockTest.anchor.set(0, 0.5);
    lockTest.position.set(200, 300);
    lockTest.on("pointerdown", () => {
      GameManager.instance.loadView(new LockTestView());
    });
    this.addChild(lockTest);
  }

  /**
   * 毎フレームの更新処理
   */
  public update(dt: number): void {
    super.update(dt);
  }
}

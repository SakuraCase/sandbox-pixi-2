import View from "framework/views/View";
import GameManager from "framework/managers/GameManager";
import { SamplePresenter } from "main/presenters/SamplePresenter";
import { Text } from "pixi.js";

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
      GameManager.instance.viewManager.sampleToXXX();
    });

    this.addChild(text);
  }

  /**
   * 毎フレームの更新処理
   */
  public update(dt: number): void {
    super.update(dt);
  }
}

import View from "framework/view";
import GameManager from "framework/gameManager";
import { SamplePresenter2 } from "main/presenters/SamplePresenter2";
import { Text } from "pixi.js";
import { SampleView } from "./SampleView";

/**
 * Sampleビュー
 */
export class SampleView2 extends View {
  /**
   * コンストラクタ
   */
  constructor() {
    super();
    this.presenter = new SamplePresenter2(this);

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
  }

  /**
   * 毎フレームの更新処理
   */
  public update(dt: number): void {
    super.update(dt);
  }
}

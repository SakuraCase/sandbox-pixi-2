import View from "framework/View";
import GameManager from "framework/GameManager";
import { SamplePresenter } from "main/presenters/SamplePresenter";
import { Text } from "pixi.js";
import { SampleView2 } from "./SampleView2";

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
  }

  /**
   * 毎フレームの更新処理
   */
  public update(dt: number): void {
    super.update(dt);
  }
}

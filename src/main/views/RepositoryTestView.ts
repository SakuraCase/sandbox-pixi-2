import View from "framework/View";
import GameManager from "framework/GameManager";
import { Text } from "pixi.js";
import { SampleView } from "./SampleView";
import { RepositoryTestPresenter } from "main/presenters/RepositoryTestPresenter";

/**
 * Sampleビュー
 */
export class RepositoryTestView extends View {
  private _count: Text;
  /**
   * コンストラクタ
   */
  constructor() {
    super();
    this.presenter = new RepositoryTestPresenter(this);

    const text = new Text("Sampleへ", {
      fontSize: 20,
      fill: 0xffffff,
    });

    this._count = new Text("", {
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

    this._count.position.set(200, 100);
    this.addChild(this._count);
  }

  /**
   * 毎フレームの更新処理
   */
  public update(dt: number): void {
    super.update(dt);
  }

  public updateCount(n: number): void {
    this._count.text = String(n);
  }
}

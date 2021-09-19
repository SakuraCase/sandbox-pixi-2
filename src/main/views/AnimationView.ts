import View from "framework/view";
import GameManager from "framework/gameManager";
import { Text } from "pixi.js";
import { SampleView } from "./SampleView";
import { AnimationPresenter } from "main/presenters/AnimationPresenter";
import { Chara } from "main/components/chara";

/**
 * Animationビュー
 */
export class AnimationView extends View {
  /** キャラクターsprite */
  private _chara!: Chara;

  /**
   * コンストラクタ
   */
  constructor() {
    super();
    this.presenter = new AnimationPresenter(this);

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
   * キャラクター表示
   */
  public showChara(): void {
    this._chara = new Chara();
    this._chara.position.set(200, 250);
    this._chara.init();
    this.addChild(this._chara);
    this.registerUpdatingObject(this._chara);
  }
}

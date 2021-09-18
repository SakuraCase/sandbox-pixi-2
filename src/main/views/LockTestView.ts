import View from "framework/view";
import GameManager from "framework/gameManager";
import { SamplePresenter } from "main/presenters/SamplePresenter";
import { Text } from "pixi.js";
import { SampleView } from "./SampleView";

export class LockTestView extends View {
  private isLocked = false;
  private count = 0;
  private text: Text;

  /**
   * コンストラクタ
   */
  constructor() {
    super();
    this.presenter = new SamplePresenter(this);

    this.text = new Text("", {
      fontSize: 20,
      fill: 0xffffff,
    });

    const link = new Text("Sampleへ", {
      fontSize: 20,
      fill: 0xffffff,
    });

    link.interactive = true;
    link.buttonMode = true;
    link.anchor.set(0, 0.5);
    link.position.set(200, 200);
    this.text.anchor.set(0, 0.5);
    this.text.position.set(200, 100);

    link.on("pointerdown", () => {
      GameManager.instance.loadView(new SampleView());
    });

    this.addChild(link);
    this.addChild(this.text);
    this.changeLock();
  }

  /**
   * 毎フレームの更新処理
   */
  public update(dt: number): void {
    super.update(dt);

    this.count++;
    if (this.count % 300 == 0) {
      this.changeLock();
    }
  }

  /**
   * 一定時間でロック状態を変更する
   */
  private changeLock(): void {
    this.isLocked = !this.isLocked;

    if (this.isLocked) {
      this.text.text = "locked";
      this.lockPointerEvent();
    } else {
      this.text.text = "unlocked";
      this.unlockPointerEvent();
    }
  }
}

import View from "framework/view";
import GameManager from "framework/gameManager";
import { SamplePresenter } from "main/presenters/SamplePresenter";
import { Text } from "pixi.js";
import { SampleView2 } from "./SampleView2";
import { LockTestView } from "./LockTestView";
import { RepositoryTestView } from "./RepositoryTestView";
import { NeumorphismTestView } from "./NeumorphismTestView";
import { AnimationView } from "./AnimationView";

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
    lockTest.position.set(200, 250);
    lockTest.on("pointerdown", () => {
      GameManager.instance.loadView(new LockTestView());
    });
    this.addChild(lockTest);

    const repositoryTest = new Text("repositoryTestへ", {
      fontSize: 20,
      fill: 0xffffff,
    });
    repositoryTest.interactive = true;
    repositoryTest.buttonMode = true;
    repositoryTest.anchor.set(0, 0.5);
    repositoryTest.position.set(200, 300);
    repositoryTest.on("pointerdown", () => {
      GameManager.instance.loadView(new RepositoryTestView());
    });
    this.addChild(repositoryTest);

    const neumorphismTest = new Text("NeumorphismTestへ", {
      fontSize: 20,
      fill: 0xffffff,
    });
    neumorphismTest.interactive = true;
    neumorphismTest.buttonMode = true;
    neumorphismTest.anchor.set(0, 0.5);
    neumorphismTest.position.set(200, 350);
    neumorphismTest.on("pointerdown", () => {
      GameManager.instance.loadView(new NeumorphismTestView());
    });
    this.addChild(neumorphismTest);

    const animationTest = new Text("AnimationTestへ", {
      fontSize: 20,
      fill: 0xffffff,
    });
    animationTest.interactive = true;
    animationTest.buttonMode = true;
    animationTest.anchor.set(0, 0.5);
    animationTest.position.set(200, 400);
    animationTest.on("pointerdown", () => {
      GameManager.instance.loadView(new AnimationView());
    });
    this.addChild(animationTest);
  }

  /**
   * 毎フレームの更新処理
   */
  public update(dt: number): void {
    super.update(dt);
  }
}

import View from "framework/views/View";
import GameManager from "framework/managers/GameManager";

/**
 * ViewManager抽象クラス
 * ビューの遷移管理/実装側にてビュー間共通オブジェクトの管理
 */
export default abstract class ViewManager {
  /**
   * ビューのリソースロード完了フラグ
   * ビュートランジションを制御するためのフラグ
   */
  private viewResourceLoaded = true;
  /**
   * ビューのトランジション完了フラグ
   * ビュートランジションを制御するためのフラグ
   */
  private viewTransitionOutFinished = true;
  /**
   * 現在のビューインスタンス
   */
  protected currentView?: View;

  /**
   * コンストラクタ
   */
  constructor(view: View) {
    this.loadView(view);
  }

  /**
   * 現在のビューを返す
   */
  public getCurrentView(): View | undefined {
    return this.currentView;
  }

  /**
   * 可能であれば新しいビューへのトランジションを開始する
   */
  public transitionInIfPossible(newView: View): boolean {
    if (!this.viewResourceLoaded || !this.viewTransitionOutFinished) {
      return false;
    }

    if (this.currentView) {
      this.currentView.destroy({ children: true });
    }
    this.currentView = newView;

    if (GameManager.instance.game) {
      GameManager.instance.game.stage.addChild(newView);
    }

    newView.beginTransitionIn();

    return true;
  }

  /**
   * ビューをロードする
   * 新しいビューのリソース読み込みと古いビューのトランジションを同時に開始する
   * いずれも完了したら、新しいビューのトランジションを開始する
   */
  public loadView(newView: View): void {
    if (this.currentView) {
      this.viewResourceLoaded = false;
      this.viewTransitionOutFinished = false;
      newView.beginLoadResource(() => {
        this.viewResourceLoaded = true;
        this.transitionInIfPossible(newView);
      });
      this.currentView.beginTransitionOut((_: View) => {
        this.viewTransitionOutFinished = true;
        this.transitionInIfPossible(newView);
      });
    } else {
      this.viewTransitionOutFinished = true;
      newView.beginLoadResource(() => {
        this.viewResourceLoaded = true;
        this.transitionInIfPossible(newView);
      });
    }
  }
}

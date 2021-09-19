import Presenter from "framework/presenter";
import { AnimationView } from "main/views/AnimationView";
import { ASSET_RESOURCES } from "resources/resource";

/**
 * Presenter
 */
export class AnimationPresenter extends Presenter {
  private _view: AnimationView;
  protected resourceList: string[] = [ASSET_RESOURCES.animations.chara];

  /**
   * コンストラクタ
   * presenterを初期化する
   */
  constructor(view: AnimationView) {
    super();
    this._view = view;
  }

  protected init(): void {
    this._view.showChara();
  }
}

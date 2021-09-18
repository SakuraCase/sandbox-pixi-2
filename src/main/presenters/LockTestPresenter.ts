import Presenter from "framework/presenter";
import { LockTestView } from "main/views/LockTestView";

/**
 * Presenter
 */
export class LockTestPresenter extends Presenter {
  // private _view: SampleView;

  /**
   * コンストラクタ
   * presenterを初期化する
   */
  constructor(_view: LockTestView) {
    super();
    // this._view = view;
  }
}

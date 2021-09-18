import Presenter from "framework/presenter";
import { SampleView } from "main/views/SampleView";

/**
 * Presenter
 */
export class SamplePresenter extends Presenter {
  // private _view: SampleView;

  /**
   * コンストラクタ
   * presenterを初期化する
   */
  constructor(_view: SampleView) {
    super();
    // this._view = view;
  }
}

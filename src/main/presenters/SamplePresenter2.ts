import Presenter from "framework/presenter";
import { SampleView2 } from "main/views/SampleView2";
import Resource from "Resource";

/**
 * Presenter
 */
export class SamplePresenter2 extends Presenter {
  // private _view: SampleView;

  /**
   * コンストラクタ
   * presenterを初期化する
   */
  constructor(_view: SampleView2) {
    super();
    // this._view = view;
    this.resourceList = [Resource.load.buttons];
  }
}

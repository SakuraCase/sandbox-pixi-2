import ViewManager from "framework/managers/ViewManager";
import { SampleView } from "./views/SampleView";

/**
 * ViewManager
 * GameManagerにセットされているものをpresenterから利用する
 */
export default class DefaultViewManager extends ViewManager {
  /**
   * 初期ビュー
   */
  constructor() {
    super(new SampleView());
  }

  public sampleToXXX(): void {
    // this.loadView(new XXX());
  }
}

import View from "framework/views/View";
/**
 * ViewManager抽象クラス
 * ビューの遷移管理/実装側にてビュー間共通オブジェクトの管理
 */
export default abstract class ViewManager {
    /**
     * ビューのリソースロード完了フラグ
     * ビュートランジションを制御するためのフラグ
     */
    private viewResourceLoaded;
    /**
     * ビューのトランジション完了フラグ
     * ビュートランジションを制御するためのフラグ
     */
    private viewTransitionOutFinished;
    /**
     * 現在のビューインスタンス
     */
    protected currentView?: View;
    /**
     * コンストラクタ
     */
    constructor(view: View);
    /**
     * 現在のビューを返す
     */
    getCurrentView(): View | undefined;
    /**
     * 可能であれば新しいビューへのトランジションを開始する
     */
    transitionInIfPossible(newView: View): boolean;
    /**
     * ビューをロードする
     * 新しいビューのリソース読み込みと古いビューのトランジションを同時に開始する
     * いずれも完了したら、新しいビューのトランジションを開始する
     */
    loadView(newView: View): void;
}

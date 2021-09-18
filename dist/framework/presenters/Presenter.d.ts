/**
 * Precenter抽象クラス
 * リソース読み込み/実装側でのViewのイベント処理
 */
export default abstract class Precenter {
    /**
     * loadInitialResource に用いるリソースリストを作成するメソッド
     */
    protected createInitialResourceList(): string[];
    /**
     * リソースダウンロードのフローを実行する
     */
    beginLoadResource(onLoaded: () => void): Promise<void>;
    /**
     * リソースダウンロードのフローを実行する
     */
    protected loadInitialResource(onLoaded: () => void): void;
    /**
     * loadInitialResource 完了時のコールバックメソッド
     */
    protected onInitialResourceLoaded(): string[];
    /**
     * 初回リソースロードで発生した追加のリソースをロードする
     */
    protected loadAdditionalResource(assets: string[], onLoaded: () => void): void;
    /**
     * 追加のリソースロード完了時のコールバック
     */
    protected onAdditionalResourceLoaded(onLoaded: () => void): void;
    /**
     * beginLoadResource 完了時のコールバックメソッド
     */
    protected onResourceLoaded(): void;
    /**
     * 渡されたアセットのリストからロード済みのものをフィルタリングする
     */
    private filterLoadedAssets;
}

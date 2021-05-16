/* eslint-disable @typescript-eslint/no-empty-function */
import * as PIXI from "pixi.js";
import LoaderAddParam from "framework/interfaces/LoaderAddParam";

/**
 * Precenter抽象クラス
 * リソース読み込み/実装側でのViewのイベント処理
 */
export default abstract class Precenter {
  protected resourceList: string[] = [];

  /**
   * リソースダウンロードのフローを実行する
   */
  public beginLoadResource(
    onLoaded: () => void,
    onComplete: () => void
  ): Promise<void> {
    return new Promise<void>((resolve) => {
      this.loadResource(onLoaded, () => resolve());
    }).then(() => {
      onComplete();
    });
  }

  /**
   * リソースダウンロードのフローを実行する
   */
  protected loadResource(onLoad: () => void, onComplete: () => void): void {
    const assets = [...this.resourceList];
    this.resourceList = [];
    const loader = PIXI.Loader.shared;
    loader.onLoad.add(() => onLoad());

    const filteredAssets = this.filterLoadedAssets(assets);

    if (filteredAssets.length > 0) {
      loader.add(filteredAssets).load(() => onComplete());
    } else {
      onComplete();
    }
  }

  /**
   * 渡されたアセットのリストからロード済みのものをフィルタリングする
   */
  private filterLoadedAssets(
    assets: (LoaderAddParam | string)[]
  ): LoaderAddParam[] {
    const assetMap = new Map<string, LoaderAddParam>();
    const loader = PIXI.Loader.shared;

    for (let i = 0; i < assets.length; i++) {
      const asset = assets[i];
      if (typeof asset === "string") {
        if (!loader.resources[asset] && !assetMap.has(asset)) {
          assetMap.set(asset, { name: asset, url: asset });
        }
      } else {
        if (!loader.resources[asset.name] && !assetMap.has(asset.name)) {
          assetMap.set(asset.name, asset);
        }
      }
    }

    const loaderParams: LoaderAddParam[] = [];
    assetMap.forEach((value: LoaderAddParam) => loaderParams.push(value));
    return loaderParams;
  }
}

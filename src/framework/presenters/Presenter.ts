/* eslint-disable @typescript-eslint/no-empty-function */
import * as PIXI from "pixi.js";
import LoaderAddParam from "framework/interfaces/LoaderAddParam";

/**
 * Precenter抽象クラス
 * リソース読み込み/実装側でのViewのイベント処理
 */
export default abstract class Precenter {
  /**
   * loadInitialResource に用いるリソースリストを作成するメソッド
   */
  protected createInitialResourceList(): string[] {
    return [];
  }

  /**
   * リソースダウンロードのフローを実行する
   */
  public beginLoadResource(onLoaded: () => void): Promise<void> {
    return new Promise<void>((resolve) => {
      this.loadInitialResource(() => resolve());
    })
      .then(() => {
        return new Promise<void>((resolve) => {
          const additionalAssets = this.onInitialResourceLoaded();
          this.loadAdditionalResource(additionalAssets, () => resolve());
        });
      })
      .then(() => {
        onLoaded();
      })
      .then(() => {
        this.onResourceLoaded();
      });
  }

  /**
   * リソースダウンロードのフローを実行する
   */
  protected loadInitialResource(onLoaded: () => void): void {
    const assets = this.createInitialResourceList();
    const loader = PIXI.Loader.shared;

    const filteredAssets = this.filterLoadedAssets(assets);

    if (filteredAssets.length > 0) {
      loader.add(filteredAssets).load(() => onLoaded());
    } else {
      onLoaded();
    }
  }

  /**
   * loadInitialResource 完了時のコールバックメソッド
   */
  protected onInitialResourceLoaded(): string[] {
    return [];
  }

  /**
   * 初回リソースロードで発生した追加のリソースをロードする
   */
  protected loadAdditionalResource(
    assets: string[],
    onLoaded: () => void
  ): void {
    if (assets.length <= 0) {
      this.onAdditionalResourceLoaded(onLoaded);
      return;
    }

    const filteredAssets = this.filterLoadedAssets(assets);

    if (filteredAssets.length > 0) {
      PIXI.Loader.shared.add(filteredAssets).load(() => {
        this.onAdditionalResourceLoaded(onLoaded);
      });
    } else {
      this.onAdditionalResourceLoaded(onLoaded);
    }
  }

  /**
   * 追加のリソースロード完了時のコールバック
   */
  protected onAdditionalResourceLoaded(onLoaded: () => void): void {
    onLoaded();
  }

  /**
   * beginLoadResource 完了時のコールバックメソッド
   */
  protected onResourceLoaded(): void {}

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

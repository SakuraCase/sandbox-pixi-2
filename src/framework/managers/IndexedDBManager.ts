/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * ブラウザの indexed db API
 */
const indexedDb = (window as any).indexedDB || (window as any).webkitIndexedDB;

/**
 * 内部利用の indexed db レコードスキーマ
 */
type IndexedDBManagerRecord = {
  key: string;
  value: any;
};

/**
 * indexed db マネージャ
 * レコードを KVS 形式のインターフェースで取り扱う
 */
export default class IndexedDBManager {
  /**
   * このマネージャが扱う固定データベース名
   */
  public static readonly dbName: string = "temporary-game-db";
  /**
   * このマネージャが扱うデータベースバージョン
   */
  public static readonly dbVersion: number = 1;
  /**
   * このマネージャが扱う固定ストア名
   */
  public static readonly storeName: string = "temporary-game-store";
  /**
   * このマネージャが扱う固定ストアのインデックス名称
   */
  public static readonly storeIndex: string = "key";

  /**
   * IDBDatabase インスタンス
   */
  private static db: IDBDatabase | null = null;

  /**
   * マネージャを初期化する
   * DB 接続を開き保持しておく
   */
  public static init(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!indexedDb) {
        console.log("indexed db is not supported");
      }
      const request = indexedDb.open(
        IndexedDBManager.dbName,
        IndexedDBManager.dbVersion
      );
      request.onupgradeneeded = (e: Event) => {
        IndexedDBManager.upgradeDB(e);
      };
      request.onsuccess = (e: Event) => {
        const db = (e.target as IDBRequest).result;
        IndexedDBManager.db = db;
        resolve();
      };
      request.onerror = (e: Event) => {
        console.debug("indexed db could not be initialized");
        console.debug(e);
        reject();
      };
    });
  }

  /**
   * レコードを保存する
   */
  public static put(key: string, data: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const store = IndexedDBManager.getStoreObject();
      if (!store) {
        reject();
      } else {
        const record = IndexedDBManager.createRecordObject(key, data);
        const request = store.put(record);
        request.onsuccess = (_) => {
          resolve();
        };
        request.onerror = (_) => {
          reject();
        };
      }
    });
  }

  /**
   * レコードを取得する
   * レコードが存在しなければ undefined を返す
   */
  public static get(key: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const store = IndexedDBManager.getStoreObject();
      if (!store) {
        reject();
      } else {
        const request = store.get(key);
        request.onsuccess = (e) => {
          const result = (e.target as IDBRequest)
            .result as IndexedDBManagerRecord;
          resolve(result ? result.value : undefined);
        };
        request.onerror = (e) => {
          reject(e);
        };
      }
    });
  }

  /**
   * レコードを削除する
   */
  public static delete(key: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const store = IndexedDBManager.getStoreObject();
      if (!store) {
        reject();
      } else {
        const request = store.delete(key);
        request.onsuccess = (_) => {
          resolve();
        };
        request.onerror = (_) => {
          reject();
        };
      }
    });
  }

  /**
   * すべてのレコードを削除する
   * 未修整
   */
  public static clear(
    onSuccess?: (e: Event) => void,
    onError?: (e?: Event) => void
  ): void {
    const store = IndexedDBManager.getStoreObject();
    if (!store) {
      if (onError) {
        onError();
      }
      return;
    }

    const request = store.clear();
    if (onSuccess) {
      request.onsuccess = (e) => {
        onSuccess(e);
      };
    }
    if (onError) {
      request.onerror = (e) => {
        onError(e);
      };
    }
  }

  /**
   * onupgradeneeded コールバックを処理しなければならない時に実行するメソッド
   */
  private static upgradeDB(e: Event): void {
    const db = (e.target as IDBRequest).result;

    const index = IndexedDBManager.storeIndex;
    const storeName = IndexedDBManager.storeName;
    const store = db.createObjectStore(storeName, { keyPath: index });
    store.createIndex(index, index, { unique: true });
  }

  /**
   * トランザクションを生成し、ストアオブジェクトを返す
   */
  private static getStoreObject(): IDBObjectStore | null {
    if (!IndexedDBManager.db) {
      return null;
    }
    const storeName = IndexedDBManager.storeName;
    const transaction = IndexedDBManager.db.transaction(storeName, "readwrite");
    return transaction.objectStore(storeName);
  }

  /**
   * Key/Value をこのマネージャが扱うオブジェクトに変換する
   */
  private static createRecordObject(
    key: string,
    value: any
  ): IndexedDBManagerRecord {
    return { key, value };
  }
}

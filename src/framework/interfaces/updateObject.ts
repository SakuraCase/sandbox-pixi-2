import { DisplayObject } from "pixi.js";

/**
 * 更新処理が行われるオブジェクトが提供すべきインターフェース
 */
export default interface UpdateObject {
  isUpdating(): boolean;
  update(_dt: number): void;
  removeDisplayObject(): DisplayObject | undefined;
}

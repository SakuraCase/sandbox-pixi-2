import PixiTextStyle from "framework/interfaces/pixiTextStyle";
import { Text } from "./text";
import UpdateObject from "framework/interfaces/updateObject";
import { DisplayObject } from "pixi.js";

export class NumberText extends Text implements UpdateObject {
  private _targetNumber = 0;
  private _currentNumber = 0;
  private _incrementValue = 0;
  private _updateDurationF = 20;

  constructor(text: number, addOption?: PixiTextStyle) {
    super(String(text), addOption);
    this._targetNumber = text;
    this._currentNumber = text;
  }

  get updateDurationF(): number {
    return this._updateDurationF;
  }
  get currentNumber(): number {
    return this._currentNumber;
  }

  /**
   * 数値を更新する
   * returnを更新オブジェクトとして指定フレーム内で少しずつ寄せる。デフォルト20
   */
  public updateNumber(n: number, updateDurationF?: number): NumberText {
    this._targetNumber = n;
    if (updateDurationF) {
      this._updateDurationF = updateDurationF;
    }

    this._incrementValue =
      (this._targetNumber - this._currentNumber) / this._updateDurationF;
    return this;
  }

  public removeDisplayObject(): DisplayObject | undefined {
    return undefined;
  }
  /**
   * 数値更新アニメーション
   */
  public update(_dt: number): void {
    const isPlusUpdateEnd =
      this._incrementValue >= 0 &&
      this._currentNumber + this._incrementValue >= this._targetNumber;
    const isMinusUpdateEnd =
      this._incrementValue <= 0 &&
      this._currentNumber + this._incrementValue <= this._targetNumber;
    if (isPlusUpdateEnd || isMinusUpdateEnd) {
      this._currentNumber = this._targetNumber;
    } else {
      this._currentNumber += this._incrementValue;
    }
    this.text = String(Math.round(this._currentNumber));
  }

  public isUpdating(): boolean {
    return this._currentNumber != this._targetNumber;
  }
}

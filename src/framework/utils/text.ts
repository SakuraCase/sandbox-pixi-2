import * as PIXI from "pixi.js";
import PixiTextStyle from "framework/interfaces/pixiTextStyle";

export class Text extends PIXI.Text {
  constructor(text: string, addOption?: PixiTextStyle) {
    let style = {
      fontSize: 32,
      fill: 0x343633,
    };
    if (addOption) {
      style = Object.assign(style, addOption);
    }

    const textStyle = new PIXI.TextStyle(style);
    super(text, textStyle);
  }

  // TODO: 文字数によって高さ調整 + 文字折り返す仕組み
  // TODO: 一定時間表示して消えていく、ログ的なもの

  // public isUpdating(): boolean {
  //   return false;
  // }

  // public update(): void {
  //   //
  // }
}

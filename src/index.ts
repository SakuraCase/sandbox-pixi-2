import * as PIXI from "pixi.js";
import GameManager from "framework/GameManager";
import { SampleView } from "main/views/SampleView";

window.onload = () => {
  GameManager.init({
    glWidth: 1920,
    glHeight: 1080,
    option: {
      backgroundColor: 0x1099bb,
    },
  });

  // スケールモードを設定する。ドット絵用
  PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
  PIXI.settings.RESOLUTION = 3;

  GameManager.start(new SampleView());
};

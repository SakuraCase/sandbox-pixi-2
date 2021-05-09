import * as PIXI from "pixi.js";
import GameManager from "framework/managers/GameManager";
import DefaultViewManager from "main/DefaultViewManager";

window.onload = () => {
  GameManager.start({
    glWidth: 1920,
    glHeight: 1080,
    option: {
      backgroundColor: 0x1099bb,
    },
  });

  // スケールモードを設定する。ドット絵用
  PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
  PIXI.settings.RESOLUTION = 3;

  GameManager.initViewManager(new DefaultViewManager());
};

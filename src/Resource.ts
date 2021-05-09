import { Loader, Sprite } from "pixi.js";

/**
 * リソースの URL や命名規則のマスタ
 */
const Resource = Object.freeze({
  load: {
    buttons: "buttons.json",
  },

  sprite: {
    startButton: (): Sprite => {
      return createSprite(
        Resource.load.buttons,
        "startButton",
        "Resource load error: startButton"
      );
    },
  },
});

const createSprite = (
  resource: string,
  name: string | number,
  errorMessage: string
): Sprite => {
  const sheet = Loader.shared.resources[resource].spritesheet;
  if (sheet) {
    return new Sprite(sheet.textures[name]);
  } else {
    throw new Error(errorMessage);
  }
};

// const createAnimatedSprite = (
//   resource: string,
//   name: string | number,
//   errorMessage: string
// ): AnimatedSprite => {
//   const sheet = Loader.shared.resources[resource].spritesheet;
//   if (sheet) {
//     return new AnimatedSprite(sheet.animations[name]);
//   } else {
//     throw new Error(errorMessage);
//   }
// };

export default Resource;

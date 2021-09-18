import { Sprite } from "pixi.js";
/**
 * リソースの URL や命名規則のマスタ
 */
declare const Resource: Readonly<{
    load: {
        buttons: string;
    };
    sprite: {
        startButton: () => Sprite;
    };
}>;
export default Resource;

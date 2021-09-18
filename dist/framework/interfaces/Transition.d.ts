import { Container } from "pixi.js";
/**
 * ビュートランジションのインターフェース
 */
export default interface Transition {
    getContainer(): Container | null;
    begin(): void;
    isBegan(): boolean;
    isFinished(): boolean;
    isActive(): boolean;
    update(dt: number): void;
    setCallback(callback: () => void): void;
}

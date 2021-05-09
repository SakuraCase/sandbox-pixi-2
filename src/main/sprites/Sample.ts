import { Container } from "pixi.js";

/**
 * サンプル
 */
export class Sample {
  private _container: Container;

  constructor() {
    this._container = new Container();
    this._container.name = "sample";
  }

  get container(): Container {
    return this._container;
  }
}

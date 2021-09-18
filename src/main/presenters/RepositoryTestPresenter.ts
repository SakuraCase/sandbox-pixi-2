import Presenter from "framework/presenter";
import { TestRepository } from "main/repositories/TestRepository";
import { RepositoryTestView } from "main/views/RepositoryTestView";

/**
 * Presenter
 */
export class RepositoryTestPresenter extends Presenter {
  private _view: RepositoryTestView;
  private _repository = new TestRepository();

  /**
   * コンストラクタ
   * presenterを初期化する
   */
  constructor(view: RepositoryTestView) {
    super();
    this._view = view;
    this.loadDB();
  }

  async loadDB(): Promise<void> {
    console.log("loadDB");
    const data = await this._repository.testTable.toArray();
    console.log(data);
    this._view.updateCount(data.length);
    await this._repository.testTable.add({ name: "data" + data.length });
  }
}

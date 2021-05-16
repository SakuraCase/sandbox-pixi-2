import Repository from "framework/Repository";

export interface TestEntity {
  id?: number;
  name?: string | null;
}

export class TestRepository extends Repository {
  public testTable!: Dexie.Table<TestEntity, number>;

  constructor() {
    super("test");

    this.version(1).stores({
      testTable: "id++",
    });
  }
}

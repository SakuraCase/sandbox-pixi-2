import Dexie from "dexie";

export interface TestEntity {
  id?: number;
  name?: string | null;
}

export class TestRepository extends Dexie {
  public testTable!: Dexie.Table<TestEntity, number>;

  constructor() {
    super("test");

    this.version(1).stores({
      testTable: "id++",
    });
  }
}

import * as dbService from "../../services/db.service";

export function createDbServiceSpies() {
  // Create a mock execute function that we can spy on in our tests.
  const mockExecute = jest.fn();


  const getDbConnectionSpy = jest
    .spyOn(dbService, "getDBConnection")
    .mockImplementation(jest.fn(() =>
  Promise.resolve({
    execute: mockExecute,
  } as any)));

  const initDbSpy = jest
    .spyOn(dbService, "initDB")
    .mockImplementation(jest.fn())

  return {
    getDbConnectionSpy,
    mockExecute,
    initDbSpy
  };
}

export type DbServiceSpies = ReturnType<typeof createDbServiceSpies>;

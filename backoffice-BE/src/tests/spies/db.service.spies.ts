import * as dbService from "../../services/db.service";

export function createDbServiceSpies() {
  // Create a mock execute function that we can spy on in our tests.
  const mockExecute = jest.fn();
  const mockQuery = jest.fn();

  const getBackOfficeDbSpy = jest
    .spyOn(dbService, "getBackOfficeDB")
    .mockImplementation(
      jest.fn(() =>
        Promise.resolve({
          execute: mockExecute,
        } as any)
      )
    );

  const getMobileApiDbSpy = jest
    .spyOn(dbService, "getMobileApiDb")
    .mockImplementation(
      jest.fn(() =>
        Promise.resolve({
          execute: mockExecute,
          query: mockQuery,
        } as any)
      )
    );


  const initDbSpy = jest
    .spyOn(dbService, "initBackOfficeDB")
    .mockImplementation(
      jest.fn(() =>
        Promise.resolve({
          execute: mockExecute,
        } as any)
      )
    );

  return {
    getBackOfficeDbSpy,
    mockExecute,
    initDbSpy,
    getMobileApiDbSpy
  };
}

export type DbServiceSpies = ReturnType<typeof createDbServiceSpies>;

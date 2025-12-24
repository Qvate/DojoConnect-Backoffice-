import * as dbService from "../db/index.js";
import { Transaction } from "../db/index.js";
import { IDojoInstructor, InstructorsRepository } from "../repositories/instructors.repository.js";

export class InstructorService {
  static findInstructorByUserId = async (
    userId: string,
    txInstance?: Transaction
  ): Promise<IDojoInstructor | null> => {
    const execute = async (tx: Transaction) => {
      return await InstructorsRepository.findOneByUserId(userId, tx);
    };

    return txInstance
      ? execute(txInstance)
      : dbService.runInTransaction(execute);
  };
}

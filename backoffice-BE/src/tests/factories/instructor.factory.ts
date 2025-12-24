import { faker } from "@faker-js/faker";
import { IDojoInstructor } from "../../repositories/instructors.repository.js";
import { IInstructorInvite } from "../../repositories/invites.repository.js";
import { InstructorInviteStatus } from "../../constants/enums.js";
import { addDays } from "date-fns";
import { InviteInstructorDTO } from "../../validations/instructors.schemas.js";

export const buildInstructorMock = (
  overrides?: Partial<IDojoInstructor>
): IDojoInstructor => {
  return {
    id: faker.string.uuid(),
    userId: faker.string.uuid(),
    dojoId: faker.string.uuid(),
    createdAt: new Date(),
    ...overrides,
  };
};

export const buildInstructorInviteMock = (
  overrides?: Partial<IInstructorInvite>
): IInstructorInvite => {
  return {
    id: faker.string.uuid(),
    email: faker.internet.email(),
    dojoId: faker.string.uuid(),
    tokenHash: faker.string.alphanumeric(64),
    status: InstructorInviteStatus.Pending,
    invitedBy: faker.string.uuid(),
    expiresAt: addDays(new Date(), 7),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    classId: faker.string.uuid(),
    createdAt: new Date(),
    respondedAt: null,
    ...overrides,
  };
};

export const buildInviteInstructorDtoMock = (
  overrides?: Partial<InviteInstructorDTO>
): InviteInstructorDTO => {
  return {
    email: faker.internet.email(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    classId: faker.string.uuid(),
    ...overrides,
  };
};

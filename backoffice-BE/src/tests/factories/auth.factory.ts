import { Role, StripePlans } from "../../constants/enums";
import { RegisterUserDTO } from "../../validations/auth.schemas";

export const buildRegisterUserDTOMock = (
  overrides?: Partial<RegisterUserDTO>
): RegisterUserDTO => {
  return {
    fullName: "John",
    username: "John Doe",
    email: "john.doe@example.com",
    password: "Password123!",
    role: Role.DojoAdmin, // must be a valid Role enum value
    referredBy: "", // optional, defaults to ""
    plan: StripePlans.Trial, // optional, defaults to Trial
    paymentMethod: "pm_1234567890", // any non-empty string
    dojoName: "Phoenix Dojo",
    dojoTag: "phoenix-dojo",
    dojoTagline: "Rise and fight",
    ...overrides, // Allows overriding specific fields for different test scenarios
  };
};

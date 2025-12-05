import type { RegisterCommand, RegisterResponse } from "./register.schema";
import type { User } from "./user.schema";
import type { LoginCommand, AuthToken } from "./auth.schemas";

export interface AuthRepository {
  login(command: LoginCommand): Promise<AuthToken>;
  register(command: RegisterCommand): Promise<RegisterResponse>;
  getCurrentUser(): Promise<User | null>;
  logout(): Promise<void>;
}

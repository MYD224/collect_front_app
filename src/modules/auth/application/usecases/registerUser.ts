import type {
  RegisterCommand,
  RegisterResponse,
} from "../../domain/register.schema";
import type { AuthRepository } from "../../domain/auth.repository";

export class RegisterUserUseCase {
  constructor(private readonly repo: AuthRepository) {}

  async execute(command: RegisterCommand): Promise<RegisterResponse> {
    return this.repo.register(command);
  }
}

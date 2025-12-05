import type { LoginCommand, AuthToken } from '../../domain/auth.schemas';
import type { AuthRepository } from '../../domain/auth.repository';

export class LoginUserUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(command: LoginCommand): Promise<AuthToken> {
    // Ici tu peux ajouter des règles métier supplémentaires si besoin.
    return this.authRepository.login(command);
  }
}

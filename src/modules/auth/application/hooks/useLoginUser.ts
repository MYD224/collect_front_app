'use client';

import { useMutation } from '@tanstack/react-query';
import { LoginUserUseCase } from '../usecases/loginUser';
import { authHttpRepository } from '../../infra/http/authHttpRepository';
import { loginSchema, type LoginCommand } from '../../domain/auth.schemas';

export function useLoginUser() {
  const useCase = new LoginUserUseCase(authHttpRepository);

  const mutation = useMutation({
    mutationFn: async (payload: LoginCommand) => {
      // Double sécurité : parse Zod au runtime
      const cmd = loginSchema.parse(payload);
      return useCase.execute(cmd);
    },
  });

  return mutation;
}

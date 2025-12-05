"use client";

import { useMutation } from "@tanstack/react-query";
import {
  registerSchema,
  type RegisterCommand,
  type RegisterResponse,
} from "../../domain/register.schema";
import { RegisterUserUseCase } from "../usecases/registerUser";
import { authHttpRepository } from "../../infra/http/authHttpRepository";

export function useRegisterUser() {
  const useCase = new RegisterUserUseCase(authHttpRepository);

  return useMutation<RegisterResponse, Error, RegisterCommand>({
    mutationFn: async (values) => {
      const cmd = registerSchema.parse(values); // validation runtime
      return useCase.execute(cmd);
    },
  });
}

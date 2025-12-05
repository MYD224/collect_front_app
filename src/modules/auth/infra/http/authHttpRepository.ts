import { httpPost } from "@/core/http/client";
import {
  authTokenSchema,
  //userSchema,
  type LoginCommand,
  type AuthToken,
  //type User,
} from "../../domain/auth.schemas";
import {userSchema, type User} from "../../domain/user.schema"
import type { AuthRepository } from "../../domain/auth.repository";
import {
  RegisterCommand,
  RegisterResponse,
  registerResponseSchema,
} from "../../domain/register.schema";

class AuthHttpRepository implements AuthRepository {
  async register(command: RegisterCommand): Promise<RegisterResponse> {
    const data = await httpPost(
      "http://localhost:8000/api/v1/register",
      command
    );

    return registerResponseSchema.parse(data);
  }
  async login(command: LoginCommand): Promise<AuthToken> {
    const data = await httpPost<AuthToken, LoginCommand>(
      "/api/auth/login",
      command
    );
    return authTokenSchema.parse(data);
  }

  async getCurrentUser(): Promise<User | null> {
    const resp = await fetch("/api/auth/me", { cache: "no-store" });
    if (resp.status === 401) return null;
    if (!resp.ok) throw new Error("Failed to fetch user");

    const data = await resp.json();
    return userSchema.parse(data);
  }

  async logout(): Promise<void> {
    await fetch("/api/auth/logout", { method: "POST" });
  }
}

export const authHttpRepository = new AuthHttpRepository();

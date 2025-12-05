'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginCommand } from '../../domain/auth.schemas';
import { useLoginUser } from '../../application/hooks/useLoginUser';
import { useLocalStorage } from 'react-use';
import { useAppDispatch } from '@/core/store';
import { setSession } from '../../application/state/authSlice';

export function LoginForm() {
  const dispatch = useAppDispatch();
  const [tokenLS, setTokenLS] = useLocalStorage<string | null>('auth_token', null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCommand>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const loginMutation = useLoginUser();

  const onSubmit = (values: LoginCommand) => {
    loginMutation.mutate(values, {
      onSuccess(data) {
        setTokenLS(data.token);
        // Ici tu peux compléter avec un appel getCurrentUser
        // et dispatcher setSession({ user, token })
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-sm space-y-4 border p-4 rounded"
    >
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          {...register('email')}
          className="w-full border rounded px-2 py-1"
        />
        {errors.email && (
          <p className="text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Mot de passe</label>
        <input
          type="password"
          {...register('password')}
          className="w-full border rounded px-2 py-1"
        />
        {errors.password && (
          <p className="text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loginMutation.isPending}
        className="w-full border rounded px-3 py-2 font-medium disabled:opacity-60"
      >
        {loginMutation.isPending ? 'Connexion…' : 'Se connecter'}
      </button>

      {loginMutation.isError && (
        <p className="text-sm text-red-600">Erreur de connexion.</p>
      )}

      {tokenLS && (
        <p className="text-sm text-green-700">Token stocké en localStorage.</p>
      )}
    </form>
  );
}

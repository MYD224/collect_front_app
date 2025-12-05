'use client';

import { parseAsString, useQueryState } from 'nuqs';
import { LoginForm } from '../components/LoginForm';

export function LoginPage() {
  const [tab, setTab] = useQueryState('tab', parseAsString.withDefault('login'));

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 p-4">
      <h1 className="text-2xl font-bold">Authentification</h1>

      <div className="flex gap-4">
        <button
          className={`px-3 py-1 border rounded ${
            tab === 'login' ? 'font-semibold' : ''
          }`}
          onClick={() => setTab('login')}
        >
          Login
        </button>
        <button
          className={`px-3 py-1 border rounded ${
            tab === 'info' ? 'font-semibold' : ''
          }`}
          onClick={() => setTab('info')}
        >
          Info
        </button>
      </div>

      {tab === 'login' && <LoginForm />}

      {tab === 'info' && (
        <div className="border rounded p-4 w-full max-w-sm text-sm">
          <p>Tu peux mettre ici des infos sur le compte, etc.</p>
        </div>
      )}
    </main>
  );
}

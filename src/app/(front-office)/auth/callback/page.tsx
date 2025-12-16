'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    const userJson = searchParams.get('user');
    const error = searchParams.get('error');

    if (error) {
      alert(error);
      router.push('/login');
      return;
    }

    if (token && userJson) {
      try {
        const user = JSON.parse(decodeURIComponent(userJson));
        localStorage.setItem('access_token', token);
        // (login as any)(token, user);
        router.push('/dashboard');
      } catch (e) {
        console.error('Erreur lors du parsing des données utilisateur:', e);
        router.push('/login');
      }
    } else {
      router.push('/login');
    }
  }, [searchParams, router]);

  return ( 
    <p>
      Authentification en cours...
    </p>
  );
}
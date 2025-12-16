// import { LoginPage } from '@/modules/auth/ui/pages/LoginPage';

import SocialLogin from "../components/socialLogin";

export default function LoginRoute() {
  // return <LoginPage />;

  return (
    <main>
      <h1>Login Page</h1>
      <SocialLogin />
    </main>
  );
}

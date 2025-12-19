"use client";

import Image from "next/image";

export default function LoginPage() {
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL_BASE;

  const handleSocialLogin = (provider: 'google' | 'facebook') => {
    window.location.href = `${apiUrl}/auth/${provider}/redirect`;
  };

  return (
    <>
      {/* Social Buttons Container */}
      < div className="d-grid gap-3 mb-4" >
        {/* Google Button */}
        < button
          onClick={() => handleSocialLogin('google')
          }
          className="btn btn-outline-dark d-flex align-items-center justify-content-center py-2 shadow-sm"
          style={{ borderRadius: "8px", fontWeight: "500" }}
        >
          <Image
            src="/icons/google-50.png"
            alt="Google"
            width={24}
            height={24}
            className="me-2"
          />
          Continuer avec Google
        </button >

        {/* Facebook Button */}
        < button
          onClick={() => handleSocialLogin('facebook')}
          className="btn btn-primary d-flex align-items-center justify-content-center py-2 shadow-sm"
          style={{ backgroundColor: "#1877F2", border: "none", borderRadius: "8px", fontWeight: "500" }}
        >
          <Image
            src="/icons/facebook-50.png"
            alt="Facebook"
            width={24}
            height={24}
            className="me-2"
          />
          Continuer avec Facebook
        </button >
      </div >

    </>
  );
}
"use client";

import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL_BASE;

  const handleSocialLogin = (provider: 'google' | 'facebook') => {
    window.location.href = `${apiUrl}/auth/${provider}/redirect`;
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow-lg border-0 p-4" style={{ maxWidth: "450px", width: "100%", borderRadius: "15px" }}>

        <div className="card-body text-center">
          {/* Header */}
          <h2 className="fw-bold mb-2">Bienvenue</h2>
          <p className="text-muted mb-4">Veuillez vous connecter pour continuer</p>

          {/* Social Buttons Container */}
          <div className="d-grid gap-3 mb-4">
            {/* Google Button */}
            <button
              onClick={() => handleSocialLogin('google')}
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
            </button>

            {/* Facebook Button */}
            <button
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
            </button>
          </div>

          {/* Divider */}
          <div className="position-relative my-4">
            <hr className="text-muted" />
            <span className="position-absolute top-50 start-50 translate-middle bg-white px-3 text-muted small">
              OU
            </span>
          </div>

          {/* Traditional Form (Optional Placeholder) */}
          <form className="text-start">
            <div className="mb-3">
              <label className="form-label small fw-bold">Email</label>
              <input type="email" className="form-control" placeholder="nom@exemple.com" style={{ borderRadius: "8px" }} />
            </div>
            <div className="mb-3">
              <label className="form-label small fw-bold">Mot de passe</label>
              <input type="password" className="form-control" placeholder="••••••••" style={{ borderRadius: "8px" }} />
            </div>
            <button className="btn btn-dark w-100 py-2 mt-2" style={{ borderRadius: "8px" }}>
              Se connecter
            </button>
          </form>

          {/* Footer */}
          <p className="mt-4 mb-0 text-muted small">
            Pas encore de compte ? <Link href="/auth/signup" className="text-primary text-decoration-none fw-bold">S'inscrire</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
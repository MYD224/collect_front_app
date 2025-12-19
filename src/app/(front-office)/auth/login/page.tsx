'use client';

import Link from "next/link";
import { login } from "../services/auth.api";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
// import { useRouter } from "next/navigation";
import SocialLogin from "../components/ui/socialLogin";
import { LoginResponse, loginSchema, TLogin } from "../types/schemas/loginSchema";
import { Input } from "@/component/ui/Input";
import { Button } from "@/component/ui/Button";
import { useRouter } from "next/navigation";

export default function LoginRoute() {
  const router = useRouter();
  const { mutateAsync: loginAsync, isError, isPending, isSuccess, data }
    = useMutation<LoginResponse, Error, TLogin>({
      mutationFn: login,
      onSuccess: (data) => {
        console.log("User logged in successfully:", data);
        // redirect('/auth/verifyphone');
        router.push(`/auth/verify-phone?ref=${data.user.id}`);
      },
      onError: (error) => {
        console.error("Error loggin in user:", error);
      },
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLogin>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<TLogin> = (values) => {
    console.log(values);
    loginAsync(values);
  };

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow-lg border-0 p-4" style={{ maxWidth: "450px", width: "100%", borderRadius: "15px" }}>

        <div className="card-body text-center">
          {/* Header */}
          <h2 className="fw-bold mb-2">Bienvenue</h2>
          <p className="text-muted mb-4">Veuillez vous connecter pour continuer</p>

          <SocialLogin />
          {/* Divider */}
          <div className="position-relative my-4">
            <hr className="text-muted" />
            <span className="position-absolute top-50 start-50 translate-middle bg-white px-3 text-muted small">
              OU
            </span>
          </div>

          {/* Traditional Form (Optional Placeholder) */}
          <form className="text-start" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <Input label="Email" className="form-control" {...register("phone")} error={errors.phone?.message} />
              {/* <label className="form-label small fw-bold">Email</label>
              <input type="email" className="form-control" placeholder="nom@exemple.com" style={{ borderRadius: "8px" }} /> */}
            </div>
            <div className="mb-3">
              <Input label="Password" type="password" className="form-control" {...register("password")} error={errors.password?.message} />
              {/* <label className="form-label small fw-bold">Mot de passe</label>
              <input type="password" className="form-control" placeholder="••••••••" style={{ borderRadius: "8px" }} /> */}
            </div>
            <Button isLoading={isPending} type="submit" className="btn btn-primary w-100">
              {isPending ? "Connexion..." : "Se connecter"}
            </Button>
            {/* <button className="btn btn-dark w-100 py-2 mt-2" style={{ borderRadius: "8px" }}>
              Se connecter
            </button> */}
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

"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { registerUser } from "../services/auth.api";
import { registerSchema, type RegisterResponse, type TRegister } from "../types/schemas/registerSchema";
import { Input } from "@/component/ui/Input";
import { Button } from "@/component/ui/Button";

export default function RegisterForm() {

  const router = useRouter();
  const { mutateAsync: registerUserAsync, isError, isPending, isSuccess, data }
    = useMutation<RegisterResponse, Error, TRegister>({
      mutationFn: registerUser,
      onSuccess: (data) => {
        console.log("User registered successfully:", data);
        // redirect('/auth/verifyphone');
        router.push(`/auth/verify-phone?ref=${data.user.id}`);
      },
      onError: (error) => {
        console.error("Error registering user:", error);
      },
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegister>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<TRegister> = (values) => {
    console.log(values);
    registerUserAsync(values);
  };

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
      <form className="card p-4 shadow-sm" style={{ width: 380 }} onSubmit={handleSubmit(onSubmit)}>
        <h3 className="mb-3">Créer un compte</h3>

        {/* <input className="form-control mb-2" placeholder="Fullname" {...register("fullname")} />
      {errors.fullname && <p className="text-danger">{errors.fullname.message}</p>} */}

        <Input type="text" placeholder="Fullname" {...register("fullname")} error={errors.fullname?.message} className="form-control mb-2" />

        {/* <input className="form-control mb-2" placeholder="Phone" {...register("phone")} />
      {errors.phone && <p className="text-danger">{errors.phone.message}</p>} */}

        <Input type="text" placeholder="Phone" {...register("phone")} error={errors.phone?.message} className="form-control mb-2" />

        {/* <input className="form-control mb-2" placeholder="Email" {...register("email")} />
      {errors.email && <p className="text-danger">{errors.email.message}</p>} */}

        <Input type="email" placeholder="Email" {...register("email")} error={errors.email?.message} className="form-control mb-2" />

        {/* <input className="form-control mb-3" placeholder="Password" type="password" {...register("password")} />
      {errors.password && <p className="text-danger">{errors.password.message}</p>} */}

        <Input placeholder="Password" {...register("password")} error={errors.password?.message} type="password" className="form-control mb-2" />

        {/* <input className="form-control mb-3" placeholder="Confirmation" type="password" {...register("password_confirmation")} />
      {errors.password_confirmation && <p className="text-danger">{errors.password_confirmation.message}</p>} */}

        <Input placeholder="Confirmation" {...register("password_confirmation")} error={errors.password_confirmation?.message} type="password" className="form-control mb-2" />

        {/* <button className="btn btn-primary w-100" disabled={isPending}>
        {isPending ? "Création..." : "Créer le compte"} 
      </button>*/}
        <Button isLoading={isPending} type="submit" className="btn btn-primary w-100">
          {isPending ? "Création..." : "Créer le compte"}
        </Button>

        {isSuccess && (
          <div className="alert alert-success mt-3">
            {data.message}<br />
            Bienvenue {data.user.fullname} !
          </div>
        )}

        {isError && (
          <div className="alert alert-danger mt-3">Une erreur est survenue.</div>
        )}
      </form>

    </div>
  );
}
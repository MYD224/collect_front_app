"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterResponse, TRegister } from "../types/schemas/registerSchema";
import { useMutation } from "@tanstack/react-query";
import {register} from "@/app/(front-office)/auth/services/auth-api";

export function RegisterForm() {

  const mutation = useMutation<RegisterResponse, Error, TRegister>({
    mutationFn: async (values) => {
      const cmd = registerSchema.parse(values); // validation runtime
      return register(cmd);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegister>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (values: TRegister) => {
    mutation.mutate(values);
  };

  return (
    <form className="card p-4 shadow-sm" style={{ width: 380 }} onSubmit={handleSubmit(onSubmit)}>
      <h3 className="mb-3">Créer un compte</h3>

      <input className="form-control mb-2" placeholder="Fullname" {...register("fullname")} />
      {errors.fullname && <p className="text-danger">{errors.fullname.message}</p>}

      <input className="form-control mb-2" placeholder="Phone" {...register("phone")} />
      {errors.phone && <p className="text-danger">{errors.phone.message}</p>}

      <input className="form-control mb-2" placeholder="Email" {...register("email")} />
      {errors.email && <p className="text-danger">{errors.email.message}</p>}

      <input className="form-control mb-3" placeholder="Password" type="password" {...register("password")} />
      {errors.password && <p className="text-danger">{errors.password.message}</p>}

      <input className="form-control mb-3" placeholder="Confirmation" type="password" {...register("password_confirmation")} />
      {errors.password_confirmation && <p className="text-danger">{errors.password_confirmation.message}</p>}

      <button className="btn btn-primary w-100" disabled={mutation.isPending}>
        {mutation.isPending ? "Création..." : "Créer le compte"}
      </button>

      {mutation.isSuccess && (
        <div className="alert alert-success mt-3">
          {mutation.data.message}<br />
          Bienvenue {mutation.data.user.fullname} !
        </div>
      )}

      {mutation.isError && (
        <div className="alert alert-danger mt-3">Une erreur est survenue.</div>
      )}
    </form>
  );
}
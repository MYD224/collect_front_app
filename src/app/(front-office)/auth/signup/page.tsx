"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterResponse, type TRegister } from "../types/schemas/registerSchema";
import { useMutation } from "@tanstack/react-query";
import {registerUser} from "../services/auth.api" ;

export default function RegisterForm() {


  const {mutateAsync: registerUserAsync, isError, isPending, isSuccess, data} 
    = useMutation<RegisterResponse, Error, TRegister>({
    // mutationFn: async (values) => {
    //   const cmd = registerSchema.parse(values); // validation runtime
    //   return registerUser(cmd);
    // },
    mutationFn: registerUser,
    onSuccess: (data) => {

      console.log("User registered successfully:", data);
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

  if(isPending) {
    return <div>Loading...</div>;
  }

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

      <button className="btn btn-primary w-100" disabled={isPending}>
        {isPending ? "Création..." : "Créer le compte"}
      </button>

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
  );
}
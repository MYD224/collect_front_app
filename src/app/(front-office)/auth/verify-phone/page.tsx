'use client';
import { useMutation } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TVerifyPhone, VerifyPhoneResponse, verifyPhoneSchema } from "../types/schemas/registerSchema";
import { verifyPhone } from "../services/auth.api";
import { useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const OTP_LENGTH = 6;

export default function verifyPhonePage() {
    const searchParams = useSearchParams();
    const user_id = searchParams.get("ref");
    const router = useRouter();

    const { mutateAsync: registerUserAsync, isError, isPending, isSuccess, data }
        = useMutation<VerifyPhoneResponse, Error, TVerifyPhone>({
            mutationFn: verifyPhone,
            onSuccess: (data) => {
                console.log("User successfully verified:", data);
                if (data.access_token) {
                    localStorage.setItem('access_token', data.access_token);
                    router.push('/dashboard');
                }
            },
            onError: (error) => {
                console.error("Error verifying user:", error);
            },
        });

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<TVerifyPhone>({
        resolver: zodResolver(verifyPhoneSchema),
    });

    const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));

    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const onSubmit: SubmitHandler<TVerifyPhone> = (values) => {
        values.user_id = user_id ?? '6de6582e-873e';
        // setValue("user_id", '6de6582e-873e-437a-b487-1f2bda07cd6d');
        console.log(values);
        // return;
        registerUserAsync(values);
    };



    const handleChange = (index: number, value: string) => {
        if (!/^\d?$/.test(value)) return;

        const copy = [...otp];
        copy[index] = value;
        setOtp(copy);

        // synchroniser RHF
        setValue("otp_code", copy.join(""));

        // focus next if value exists
        if (value && index < OTP_LENGTH - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    if (isPending) {
        return <div>Loading...</div>;
    }


    return (
        <div className="ml-3 mt-5">
            <form className="card p-4 shadow-sm" style={{ width: 380 }} onSubmit={handleSubmit(onSubmit)}>
                <h3 className="mb-3">Vérification de compte</h3>

                {/* hidden RHF field */}
                <input type="hidden" {...register("otp_code")} />

                <div className="d-flex gap-2 justify-content-between mb-2">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => {
                                inputRefs.current[index] = el;
                            }}
                            type="text"
                            maxLength={1}
                            inputMode="numeric"
                            className="form-control text-center fs-4"
                            style={{ width: "3rem" }}
                            value={digit}
                            onChange={(e) => handleChange(index, e.target.value)}
                        />
                    ))}
                </div>

                {errors.otp_code && (
                    <p className="text-danger">{errors.otp_code.message}</p>
                )}

                <button className="btn btn-primary w-100" type="submit">
                    Vérifier
                </button>
                {isSuccess && (
                    <div className="alert alert-success mt-3">
                        {/* {data.access_token}<br /> */}
                        Vérification réussie !
                    </div>
                )}

                {isError && (
                    <div className="alert alert-danger mt-3">Une erreur est survenue.</div>
                )}
            </form>
        </div>

    );
}
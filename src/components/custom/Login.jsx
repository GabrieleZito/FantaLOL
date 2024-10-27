import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, NavLink } from "react-router-dom";
import { z } from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import API from "../../API.js";
import { useMutation } from "@tanstack/react-query";

const loginSchema = z.object({
    username: z.string().min(1, { message: "Username is required" }),
    password: z.string().min(1, { message: "Password is required" }),
});

export function Login(props) {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        getValues,
        setError,
    } = useForm({ resolver: zodResolver(loginSchema) });

    const login = useMutation({
        mutationKey: ["login"],
        retry: false,
        mutationFn: API.login,
        onSuccess: (user) => {
            console.log(user);
            props.setUser(user);
            navigate("/dashboard");
        },
        onError: (err) => {
            const error = err.response.data.err;
            console.log(error);
            setError("password", { message: error });
        },
    });

    const onSubmit = async () => {
        login.mutate({
            username: getValues("username"),
            password: getValues("password"),
        });
    };

    return (
        <>
            <div className="container flex items-center justify-center h-auto py-28">
                <div className="w-96">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col space-y-2"
                    >
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                {...register("username")}
                                type="text"
                                id="username"
                                placeholder="Username"
                            />
                            {errors.username ? (
                                <p className="mt-2 text-sm text-red-500">
                                    {errors.username.message}
                                </p>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                {...register("password")}
                                type="password"
                                placeholder="Password"
                                id="password"
                            />
                            {errors.password ? (
                                <p className="mt-2 text-sm text-red-500">
                                    {errors.password.message}
                                </p>
                            ) : (
                                ""
                            )}
                        </div>
                        <NavLink to="/reset-password">
                            <p className="text-sm">Forgot Password</p>
                        </NavLink>

                        <Button className="">Login</Button>
                    </form>
                </div>
            </div>
        </>
    );
}

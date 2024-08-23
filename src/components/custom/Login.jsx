import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import API from "../../API.js";

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

    const onSubmit = async (data) => {
        const result = await API.login({
            username: getValues("username"),
            password: getValues("password"),
        });
        console.log(result);
        setError("password", {message: result.err});
    };

    return (
        <>
            <div className="container flex flex-col h-auto max-w-96 py-28">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col space-y-2"
                >
                    <div className="grid gap-1.5">
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
                    <div>
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
                    <div className="items-center justify-center max-w-full ">
                        <Button className="mt-3">Login</Button>
                    </div>
                </form>
            </div>
        </>
    );
}

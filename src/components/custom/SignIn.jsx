import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import API from "../../API.js";

const signUpSchema = z
    .object({
        email: z.string().email(),
        username: z.string(),
        password: z.string().min(10, "At least 10 characters"),
        repassword: z.string(),
    })
    .refine((data) => data.password === data.repassword, {
        message: "Passwords must match",
        path: ["repassword"],
    });

export function SignIn() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        getValues,
        setError,
    } = useForm({
        resolver: zodResolver(signUpSchema),
    });

    const onSubmit = async (data) => {
        console.log("SUBMIT");
        const result = await API.register({
            email: getValues("email"),
            username: getValues("username"),
            password: getValues("password"),
        });
        console.log(result);
        if (result.err) {
            console.log(result.field);
            setError(result.field, { message: result.err });
        } else {
            alert("Utente registrato");
        }
    };

    return (
        <>
            <div className="container flex items-center justify-center h-screen ">
                <div className="w-96">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col items-center space-y-2"
                    >
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                {...register("email")}
                                type="email"
                                id="email"
                                placeholder="Email"
                            />
                            {errors.email ? (
                                <p className="mt-2 text-sm text-red-500">
                                    {errors.email.message}
                                </p>
                            ) : (
                                ""
                            )}
                        </div>
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
                            <Label htmlFor="pwd">Password</Label>
                            <Input
                                {...register("password")}
                                type="password"
                                id="pwd"
                                placeholder="Password"
                            />
                            {errors.password ? (
                                <p className="mt-2 text-sm text-red-500">
                                    {errors.password.message}
                                </p>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="repwd">Repeat Password</Label>
                            <Input
                                {...register("repassword")}
                                type="password"
                                id="repwd"
                                placeholder="Password"
                            />
                            {errors.repassword ? (
                                <p className="mt-2 text-sm text-red-500">
                                    {errors.repassword.message}
                                </p>
                            ) : (
                                ""
                            )}
                        </div>

                        <Button disabled={isSubmitting} className="mt-20">
                            Submit
                        </Button>
                    </form>
                </div>
            </div>
        </>
    );
}

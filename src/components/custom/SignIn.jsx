import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import API from "../../API.js";
import { NavLink, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

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

export function SignIn(props) {
    const navigate = useNavigate();

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

    const registerUser = useMutation({
        mutationFn: API.register,
        mutationKey: ["register"],
        onSuccess: (user) => {
            console.log(user);
            props.setUser({
                bio: "",
                birthDay: "",
                email: user.email,
                firstName: "",
                lastName: "",
                profilePicture: user.profilePicture,
                id: user.id,
                username: user.username,
            });
            navigate("/dashboard");
        },
        onError: (err) => {
            const error = err.response.data.err;
            console.log(error);
            setError(error.split(" ")[0], { message: error });
        },
        retry: false,
    });

    const onSubmit = async () => {
        registerUser.mutate({
            email: getValues("email"),
            username: getValues("username"),
            password: getValues("password"),
        });
    };

    return (
        <>
            <div className="container flex items-center justify-center h-auto py-28">
                <div className="w-96">
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center space-y-2">
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input {...register("email")} type="email" id="email" placeholder="Email" />
                            {errors.email ? <p className="mt-2 text-sm text-red-500">{errors.email.message}</p> : ""}
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="username">Username</Label>
                            <Input {...register("username")} type="text" id="username" placeholder="Username" />
                            {errors.username ? <p className="mt-2 text-sm text-red-500">{errors.username.message}</p> : ""}
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="pwd">Password</Label>
                            <Input {...register("password")} type="password" id="pwd" placeholder="Password" />
                            {errors.password ? <p className="mt-2 text-sm text-red-500">{errors.password.message}</p> : ""}
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="repwd">Repeat Password</Label>
                            <Input {...register("repassword")} type="password" id="repwd" placeholder="Password" />
                            {errors.repassword ? <p className="mt-2 text-sm text-red-500">{errors.repassword.message}</p> : ""}
                        </div>
                        <div className="container flex justify-between px-0">
                            <NavLink to="/login">
                                <p className="text-sm">Already have an account? Login</p>
                            </NavLink>
                        </div>
                        <Button disabled={isSubmitting} className="">
                            Register
                        </Button>
                    </form>
                </div>
            </div>
        </>
    );
}

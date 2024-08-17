import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { FormDescription } from "../ui/form";
import API from "../../API.js";

const signUpSchema = z.object({
    email: z.string().email(),
    password: z.string().min(10, "At least 10 characters"),
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
        API.login();
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-full">
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
                                Inserisci email valida
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
                                Password not valid
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
        </>
    );
}

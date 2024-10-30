import { Separator } from "@/components/ui/separator";
import { Button } from "../ui/button";
import { plus } from "@/assets/svgConstants";
import { z } from "zod";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import API from "@/API";
import { Link, useNavigate } from "react-router-dom";

const diagSchema = z.object({
    name: z.string().min(3, { message: "Name is required" }),
    coins: z.coerce.number().int().gt(0),
    fee: z.number().int().gte(0),
});

export function Leaderboards(props) {
    const [priv, setPriv] = useState(false);   

    const userLead = useQuery({
        queryKey: ["userLead"],
        queryFn: () => API.getUserLeaderboard(props.user.id)
    })
    console.log(userLead.data)
    /* const friendsLead = useQuery({
        queryKey: ["friendLead"],
        que
    }) */

    return (
        <>
            <div className="p-4 sm:ml-64">
                    <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                        <div className="flex space-x-4 align-middle">
                            <div className="text-2xl font-medium text-slate-500">
                                Your Leaderboards
                            </div>
                            <LeadDialog
                                priv={priv}
                                setPriv={setPriv}
                                user={props.user}
                            />
                        </div>
                        {userLead.data ? (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {userLead.data.map( x => (
                                        <TableRow key={x.id}>
                                            <TableCell>{x.name}</TableCell>
                                            <TableCell className="text-right"><Link to={`/dashboard/leaderboards/${x.id}`}><Button className="">Details</Button></Link></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ):("")}
                        <Separator className="my-4" />
                        <p className="text-2xl font-medium text-slate-500">
                            Friends' Leaderboards
                        </p>
                    </div>
                </div>
        </>
    );
}
//TODO Gestione errore nome duplicato
function LeadDialog(props) {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm({ resolver: zodResolver(diagSchema) });

    const submitLeaderboard = useMutation({
        mutationKey: ["leader"],
        mutationFn: API.submitLeader,
        onSuccess: (data) => {
            console.log(data);
            navigate("/dashboard/leaderboards/"+data)
        },
        onError: (err) => {
            console.log(err);
        },
    });

    const onSubmit = () => {
        event.preventDefault();
        submitLeaderboard.mutate({
            idUser: props.user.id,
            name: getValues("name"),
            coins: getValues("coins"),
            fee: getValues("fee"),
            private: props.priv,
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant=""> {plus}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create new Leaderboard</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <div className="grid items-center grid-cols-4 gap-4">
                    <Label htmlFor="username" className="text-right">
                        Visibility
                    </Label>
                    <Select onValueChange={props.setPriv}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue
                                placeholder={props.priv ? "Private" : "Public"}
                            />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={true}>Private</SelectItem>
                            <SelectItem value={false}>Public</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-4 py-2">
                        <div className="grid items-center grid-cols-4 gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>

                            <Input
                                id="name"
                                {...register("name")}
                                type="text"
                                className="col-span-3"
                                placeholder="Your Leaderboard"
                            />
                        </div>
                        <div className="flex justify-end">
                            {errors.name ? (
                                <p className="mt-0 text-sm text-red-500">
                                    {errors.name.message}
                                </p>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="grid items-center grid-cols-4 gap-4">
                            <Label htmlFor="coins" className="text-right">
                                Max Coins
                            </Label>
                            <Input
                                id="coins"
                                {...register("coins")}
                                className="col-span-3"
                                type="number"
                                placeholder="1"
                            />
                        </div>
                        <div className="flex justify-end">
                            {errors.coins ? (
                                <p className="mt-2 text-sm text-red-500">
                                    {errors.coins.message}
                                </p>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="grid items-center grid-cols-4 gap-4">
                            <Label htmlFor="fee" className="text-right">
                                Entry Fee
                            </Label>
                            <Input
                                id="fee"
                                {...register("fee", {
                                    setValueAs: (v) =>
                                        v === "" ? undefined : parseInt(v, 10),
                                })}
                                className="col-span-3"
                                type="number"
                                placeholder="0"
                            />
                        </div>
                        <div className="flex justify-end">
                            {errors.fee ? (
                                <p className="mt-2 text-sm text-red-500">
                                    {errors.fee.message}
                                </p>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>

                    <DialogFooter>
                        <Button>Next</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

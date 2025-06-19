import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, MapPin, Link as LinkIcon, Calendar } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import gold from "@/assets/icons/gold.png";
import silver from "@/assets/icons/silver.png";
import bronze from "@/assets/icons/bronze.png";
import { Input, TextareaAutosize } from "@mui/material";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import API from "@/API";
import { setUser } from "@/slices/userSlice";

export function Profile(props) {
    const user = useSelector((state) => state.user);
    const [isEditOn, setIsEditOn] = useState(false);
    const [first, setFirst] = useState(user.firstName);
    const [last, setLast] = useState(user.lastName);
    const [bio, setBio] = useState(user.bio);
    const dispatch = useDispatch();

    const reset = () => {
        setFirst(user.firstName);
        setLast(user.lastName);
        setBio(user.bio);
    };

    const saveProfile = useMutation({
        mutationFn: () => API.editProfile({ firstName: first, lastName: last, bio: bio }),
        mutationKey: ["saveProfile"],
        onSuccess: (data) => {
            setIsEditOn(false);
            dispatch(setUser(data));
            console.log("save profile success");
            console.log(data);
        },
        onError: (data) => {
            reset();
            setIsEditOn(false);
            console.log("save profile error");
            console.log(data);
        },
    });

    const save = (e) => {
        e.preventDefault();
        console.log("submit done");

        saveProfile.mutate();
    };

    return (
        <div className="p-4 sm:ml-64">
            <Card className="rounded-lg border-2 border-dashed border-gray-200 p-4 dark:border-gray-700">
                <CardHeader className="flex flex-col items-center gap-4 border-b pb-8 sm:flex-row">
                    <Avatar className="h-32 w-32">
                        <AvatarImage src={user.profilePicture} alt="profile picture" />
                        <AvatarFallback>{user.username}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-2 text-center sm:text-left">
                        <CardTitle className="text-3xl">{user.firstName + " " + user.lastName}</CardTitle>
                        <CardDescription className="text-xl">@{user.username}</CardDescription>
                        <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
                            <Badge variant="secondary">
                                <img src={gold} className="w-5" />0{" "}
                            </Badge>
                            <Badge variant="secondary">
                                <img src={silver} className="w-5" />0{" "}
                            </Badge>
                            <Badge variant="secondary">
                                <img src={bronze} className="w-5" />0{" "}
                            </Badge>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="mt-6 space-y-8">
                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold">About Me</h2>
                        <form onSubmit={save}>
                            <div className="grid grid-cols-5 grid-rows-3 gap-1">
                                <div className="max-w-fit">
                                    <Label htmlFor="firstName">First Name:</Label>
                                </div>
                                <div className="max-w-fit">
                                    <Label htmlFor="lastName">Last Name:</Label>
                                </div>
                                <div className="row-start-2">
                                    <Input type="text" id="email" disabled={!isEditOn} value={first} onChange={(e) => setFirst(e.target.value)} />
                                </div>
                                <div className="row-start-2">
                                    <Input type="text" id="lastName" disabled={!isEditOn} value={last} onChange={(e) => setLast(e.target.value)} />
                                </div>
                                <div className="col-start-1 row-start-3">
                                    <Label htmlFor="bio">Bio:</Label>
                                </div>
                            </div>
                            <TextareaAutosize
                                type="text"
                                minRows={5}
                                className="w-full rounded-sm border-2 border-gray-200 bg-white p-3 text-base shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                disabled={!isEditOn}
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                            />
                            <div className="mt-2 flex justify-end">
                                {isEditOn ? (
                                    <>
                                        <div className="flex flex-row gap-2">
                                            <Button type="submit">Save</Button>
                                            <Button
                                                onClick={() => {
                                                    setIsEditOn((x) => !x);
                                                    reset();
                                                }}
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    </>
                                ) : (
                                    <Button onClick={() => setIsEditOn((x) => !x)}>Edit Profile</Button>
                                )}
                            </div>
                        </form>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold">Contact Information</h2>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="flex items-center space-x-2">
                                <Mail className="h-5 w-5 text-gray-400" />
                                <span>{user.email}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <MapPin className="h-5 w-5 text-gray-400" />
                                <span>San Francisco, CA</span>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold">Recent Activity</h2>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                                <Calendar className="h-5 w-5 text-gray-400" />
                                <span className="text-gray-600">...</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Calendar className="h-5 w-5 text-gray-400" />
                                <span className="text-gray-600">...</span>
                            </div>
                        </div>
                    </section>
                </CardContent>
            </Card>
        </div>
    );
}

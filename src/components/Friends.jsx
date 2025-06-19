import API from "@/API";
import { close, confirmationGreen, errorRed, lens } from "@/assets/icons/svgConstants";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function Friends(props) {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState("");

    const addFriend = useMutation({
        mutationFn: API.sendRequest,
        mutationKey: ["friendRequest", search],
        onSuccess: (data) => {
            const msg = data.msg;
            //console.log(msg);
            setShowSuccess(true);
            setShowError("");
        },
        onError: (err) => {
            if (err.response.status == 401) {
                navigate("/login");
            }
            const error = err.response.data.err;
            console.log(error);
            setShowError(error);
        },
    });

    const friends = useQuery({
        queryKey: ["friends"],
        queryFn: API.getFriends,
    });
    if (friends.data) console.log(friends.data);

    const submit = (e) => {
        e.preventDefault();
        addFriend.mutate(search);
    };

    return (
        <>
            <div className="p-4 sm:ml-64">
                <div className="rounded-lg border-2 border-dashed border-gray-200 p-4 dark:border-gray-700">
                    <form onSubmit={submit}>
                        <label htmlFor="search" className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Search
                        </label>
                        <div className="relative">
                            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                                <svg
                                    className="h-4 w-4 text-gray-500 dark:text-gray-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 20"
                                >
                                    {lens}
                                </svg>
                            </div>
                            <input
                                type="search"
                                id="search"
                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                placeholder="Username"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                required
                            />
                            <button
                                type="submit"
                                className="absolute end-2.5 bottom-2.5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Send Request
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="p-4 sm:ml-64">
                <div className="rounded-lg border-2 border-dashed border-gray-200 p-4 dark:border-gray-700">
                    {friends.isSuccess && friends.data != null && friends.data.length > 0 ? (
                        friends.data.map((x) => (
                            <Card key={x.id} className="mb-2">
                                <CardContent className="mb- flex items-center p-4">
                                    <Avatar className="h-12 w-12">
                                        <AvatarImage src={x.profilePicture} alt={x.username} />
                                        <AvatarFallback>{x.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <div className="ml-4 flex-grow">
                                        <div className="font-semibold">{x.firstName + " " + x.lastName} </div>
                                        <div className="text-muted-foreground text-sm">@{x.username}</div>
                                    </div>
                                    {/* <StatusBadge status={x.status} lastSeen={x.lastSeen} /> */}
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <div className="flex justify-center text-2xl font-medium text-slate-500">You don't have any friends yet... :(</div>
                    )}
                </div>
            </div>
            {showSuccess ? <Toast text="Request Sent" icon={confirmationGreen} setShowError={setShowError} setShowSuccess={setShowSuccess} /> : ""}
            {showError ? <Toast text={showError} icon={errorRed} setShowError={setShowError} setShowSuccess={setShowSuccess} /> : ""}
        </>
    );
}

function Toast(props) {
    return (
        <>
            <div
                id="toast-success"
                className="fixed right-5 bottom-5 mb-4 flex w-full max-w-xs items-center rounded-lg bg-white p-4 text-gray-500 shadow dark:bg-gray-800 dark:text-gray-400"
            >
                {props.icon}
                <div className="ms-3 text-sm font-normal">{props.text}</div>
                <button
                    onClick={() => {
                        props.setShowError("");
                        props.setShowSuccess(false);
                    }}
                    type="button"
                    className="-mx-1.5 -my-1.5 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-gray-300 dark:bg-gray-800 dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white"
                    aria-label="Close"
                >
                    <span className="sr-only">Close</span>
                    {close}
                </button>
            </div>
        </>
    );
}
function StatusBadge({ status, lastSeen }) {
    const statusConfig = {
        online: { label: "Online", color: "bg-green-500" },
        offline: { label: "Offline", color: "bg-gray-500" },
        away: { label: "Away", color: "bg-yellow-500" },
    };

    return (
        <div className="text-right">
            <Badge className={`${statusConfig[status].color} text-white`}>{statusConfig[status].label}</Badge>
            {status === "offline" && lastSeen && <div className="text-muted-foreground mt-1 text-xs">Last seen: {lastSeen}</div>}
        </div>
    );
}

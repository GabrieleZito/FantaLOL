import API from "@/API";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Bell } from "lucide-react";

import { Button } from "../ui/button";

export function Inbox(props) {
    const queryClient = useQueryClient();

    const friendReq = useQuery({
        queryKey: ["friendReq"],
        queryFn: API.getFriendRequests,
    });

    const invites = useQuery({
        queryKey: ["invites"],
        queryFn: API.getInvites,
    });
/*     if (invites.data) {
        console.log(invites.data);
    }
    if (friendReq.data) {
        console.log(friendReq.data);
    } */

    const acceptFriend = useMutation({
        mutationKey: ["acceptFriend"],
        mutationFn: API.acceptFriend,
        onSuccess: (data) => {
            console.log(data);
            queryClient.invalidateQueries({ queryKey: ["friendReq"] });
        },
        onError: (err) => {
            if (err.response.status == 401) {
                navigate("/login");
            }
            const error = err.response.data.err;
            console.log(error);
        },
    });

    const acceptInvite = useMutation({
        mutationKey: ["acceptInvite"],
        mutationFn: API.acceptInvite,
        onSuccess: (data) => {
            console.log(data);
            queryClient.invalidateQueries({ queryKey: ["invites"] });
        },
        onError: (err) => {
            if (err.response.status == 401) {
                navigate("/login");
            }
            const error = err.response.data.err;
            console.log(error);
        },
    });

    const accetta = (id) => {
        console.log(id);
        acceptFriend.mutate({ id: id });
    };

    const accettaInvito = (id) => {
        console.log(id);
        acceptInvite.mutate({ id: id });
    };

    //TODO Aggiungere funzione per rifiutare
    return (
        <div className="p-4 sm:ml-64">
            <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                <div className="text-2xl font-medium text-slate-500">Invites</div>
                <div className="mt-12">
                    {invites.data && invites.data.length>0 ? (
                        invites.data.map((x) => (
                            <InviteBox
                                leadName={x.Leaderboard.name}
                                invitedBy={x.Leaderboard.Created.username}
                                onAccept={() => accettaInvito(x.id)}
                                key={x.id}
                            />
                        ))
                    ) : (
                        <div className="flex justify-center text-2xl font-medium text-slate-500">You have no invites</div>
                    )}
                </div>
            </div>
            <div className="p-4 mt-3 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                <div className="text-2xl font-medium text-slate-500">Friend Requests</div>
                <div className="mt-12">
                    {friendReq.data && friendReq.data.length > 0 ? (
                        friendReq.data.map((x) => (
                            <FriendRequestBox
                                username={x.username}
                                avatarUrl={x.profilePicture}
                                onAccept={() => accetta(x.id)}
                                key={x.id}
                            />
                        ))
                    ) : (
                        <div className="flex justify-center text-2xl font-medium text-slate-500">You have no requests</div>
                    )}
                </div>
            </div>
        </div>
    );
}

function FriendRequestBox({ username, avatarUrl, onAccept, onDecline }) {
    return (
        <div className="flex items-center justify-between p-4 bg-card rounded-lg shadow-md w-full mb-2">
            <div className="flex items-center space-x-4">
                <Avatar>
                    <AvatarImage src={avatarUrl} alt={username} />
                    <AvatarFallback>{username.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-medium">{username}</p>
                    <p className="text-sm text-muted-foreground">Sent you a friend request</p>
                </div>
            </div>
            <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={onDecline}>
                    Decline
                </Button>
                <Button size="sm" onClick={onAccept}>
                    Accept
                </Button>
            </div>
        </div>
    );
}

function InviteBox({ leadName, invitedBy, onAccept, onDecline }) {
    return (
        <div className="flex items-center justify-between p-4 bg-card rounded-lg shadow-md w-full mb-2">
            <div className="flex items-center space-x-4">
                <Bell className="h-5 w-5 text-primary" />

                <div>
                    <p className="font-medium">{leadName}</p>
                    <p className="text-sm text-muted-foreground">By: {invitedBy}</p>
                </div>
            </div>
            <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={onDecline}>
                    Decline
                </Button>
                <Button size="sm" onClick={onAccept}>
                    Accept
                </Button>
            </div>
        </div>
    );
}

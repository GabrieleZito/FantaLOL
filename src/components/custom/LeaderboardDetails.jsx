import API from "@/API";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../ui/button";
import { useState } from "react";

export function LeaderboardDetails(props) {
    const socket = props.socket
    const [invFriend, setInvFriend] = useState("");
    const { leadId } = useParams();
    const navigate = useNavigate();

    const getLeaderboard = useQuery({
        queryKey: ["leaderboard", leadId],
        queryFn: () => API.getLeaderboard(leadId),
    });
    if (getLeaderboard.isSuccess) {
        console.log(getLeaderboard.data);
    }

    const friends = useQuery({
        queryKey: ["friends"],
        queryFn: API.getFriends,
    });
    //console.log(friends.data);
    //console.log(typeof friends);
    //console.log(Object.values(friends));

    const invite = useMutation({
        mutationKey: ["inviteFriend"],
        mutationFn: API.inviteFriend,
    });

    const inviteFriend = (e) => {
        e.preventDefault();
        invite.mutate({
            friend: invFriend,
            idLeaderboard: getLeaderboard.data.id,
        });
    };

    const apriAsta = () => {
        //socket.emit("joinAsta", { leadid: leadId, userId: props.user.id, username: props.user.username });
        navigate("/dashboard/leaderboards/" + leadId + "/auction");
    };

    //TODO aggiungere limite di persone da poter invitare
    return (
        <>
            {getLeaderboard.data ? (
                <>
                    <div className="p-4 sm:ml-64">
                        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                            <div className="flex items-center justify-between text-slate-400">
                                <p className="text-2xl font-medium text-slate-500">{getLeaderboard.data.name}</p>
                                <p>Entry fee: {getLeaderboard.data.fee}</p>
                                <p>Max coins per user: {getLeaderboard.data.max_coins}</p>
                                <p>{getLeaderboard.data.private ? "Private" : "Public"} leaderboard</p>
                            </div>
                            <div className="pt-5">
                                <div className="flex justify-between">
                                    <form className="flex" onSubmit={inviteFriend}>
                                        {friends.data ? (
                                            <>
                                                <Autocomplete
                                                    id="invite-friend"
                                                    sx={{ width: 300 }}
                                                    options={friends.data}
                                                    getOptionLabel={(opt) => opt.username}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            label="Invite a Friend"
                                                            slotProps={{
                                                                htmlInput: {
                                                                    ...params.inputProps,
                                                                    autoComplete: "new-password", // disable autocomplete and autofill
                                                                },
                                                            }}
                                                        />
                                                    )}
                                                    renderOption={(prop, option) => {
                                                        const { key, ...optionProps } = prop;
                                                        return (
                                                            <Box
                                                                key={key}
                                                                component="li"
                                                                sx={{
                                                                    "& > img": {
                                                                        mr: 2,
                                                                        flexShrink: 0,
                                                                    },
                                                                }}
                                                                {...optionProps}
                                                            >
                                                                <img
                                                                    loading="lazy"
                                                                    width="20"
                                                                    src={option.profilePicture}
                                                                    alt=""
                                                                />
                                                                {option.username}
                                                            </Box>
                                                        );
                                                    }}
                                                    onChange={(e, v) => setInvFriend(v)}
                                                />
                                                <Button type="submit">Invite</Button>
                                            </>
                                        ) : (
                                            ""
                                        )}
                                    </form>
                                    {getLeaderboard.data.createdBy == props.user.id ? (
                                        <Button onClick={apriAsta}>Crea Asta</Button>
                                    ) : (
                                        <Button onClick={apriAsta}>Apri Asta</Button>
                                    )}
                                </div>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>User</TableHead>
                                            <TableHead className="text-right">Score</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {getLeaderboard.data.Partecipate.map((x) => (
                                            <TableRow key={x.id}>
                                                <TableCell>{x.username}</TableCell>
                                                <TableCell className="text-right">{x.Partecipations.score}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                "ERRORE"
            )}
        </>
    );
}

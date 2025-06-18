import API from "@/API";
import { Button } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";

export function Team() {
    const { leadId } = useParams();
    const [selectedPlayers, setSelectedPlayers] = useState({
        Top: null,
        Jungle: null,
        Mid: null,
        Bot: null,
        Support: null,
    });

    const teamQuery = useQuery({
        queryFn: () => API.getUserTeam(leadId),
        queryKey: ["team"],
    });

    const teamPoints = useQuery({
        queryKey: ["teamPoints"],
        queryFn: () => API.getUserTeamPoints(leadId),
    });

    if (teamPoints.isSuccess) {
        console.log(teamPoints.data);
    }

    const save = useMutation({
        mutationKey: ["saveTeam"],
        mutationFn: () => API.saveTeam(leadId, selectedPlayers),
        onSuccess: () => {
            console.log("SUCCESS");
        },
        onError: () => {
            console.log("ERROR");
        },
    });

    let team;
    if (teamQuery.isSuccess && teamQuery.data) {
        team = teamQuery.data.Team.Players;
        //console.log(team);
        team = team.reduce((acc, player) => {
            if (!acc[player.role]) {
                acc[player.role] = [];
            }
            //console.log(player);
            acc[player.role].push(player);
            return acc;
        }, {});
        console.log(team);
    }

    const handleSelect = (role, playerId) => {
        setSelectedPlayers((prev) => ({
            ...prev,
            [role]: playerId,
        }));
        console.log(role, playerId);
    };

    const roles = ["Top", "Jungle", "Mid", "Bot", "Support"];

    const saveTeam = async () => {
        save.mutate();
    };

    return (
        <>
            <div className="p-4 sm:ml-64">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                    {teamQuery.isSuccess && teamQuery.data ? (
                        <>
                            <div className="flex flex-col">
                                <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-3">
                                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                                            <div>
                                                Your Team
                                                <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                                                    Select your active players
                                                </p>
                                            </div>
                                        </caption>
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
                                                <th scope="col" className="px-6 py-3">
                                                    Top
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Jungle
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Mid
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Bot
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Support
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                                {roles.map((role) => {
                                                    const player = team?.[role]?.[0];
                                                    const isEmpty = !player;
                                                    return (
                                                        <td key={`${role}-0`} className="px-6 py-4">
                                                            <button
                                                                onClick={() => handleSelect(role, player?.id)}
                                                                disabled={isEmpty}
                                                                className={`w-full px-4 py-2 rounded ${
                                                                    selectedPlayers[role] === player?.id
                                                                        ? "bg-blue-500 text-white"
                                                                        : ""
                                                                } ${isEmpty ? "opacity-50 cursor-not-allowed" : ""}`}
                                                            >
                                                                {player?.name ?? "Empty"}
                                                            </button>
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                                {roles.map((role) => {
                                                    const player = team?.[role]?.[1];
                                                    const isEmpty = !player;
                                                    return (
                                                        <td key={`${role}-1`} className="px-6 py-4">
                                                            <button
                                                                onClick={() => handleSelect(role, player?.id)}
                                                                disabled={isEmpty}
                                                                className={`w-full px-4 py-2 rounded ${
                                                                    selectedPlayers[role] === player?.id
                                                                        ? "bg-blue-500 text-white"
                                                                        : ""
                                                                } ${isEmpty ? "opacity-50 cursor-not-allowed" : ""}`}
                                                            >
                                                                {player?.name ?? "Empty"}
                                                            </button>
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                            <tr></tr>
                                        </tbody>
                                    </table>
                                </div>
                                <Button variant="contained" className="" onClick={saveTeam}>
                                    Save
                                </Button>
                            </div>
                        </>
                    ) : (
                        "You don't have a team yet"
                    )}
                    <div className="mt-4">
                        <p className="flex justify-center text-2xl font-medium text-slate-500">Recent Activities</p>
                        <div>
                            {teamPoints.data ? (
                                <div className="grid grid-cols-3 auto-cols-min">
                                    {teamPoints.data.Points.map((p) => (
                                        <>
                                            <div className="text-sky-700 font-medium">{p.Player.name}</div>
                                            <div className="">{"+" + p.points}</div>
                                            <div className="">{p.description}</div>
                                        </>
                                    ))}
                                </div>
                            ) : (
                                <p>No activities</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

import API from "@/API";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";

export function Team() {
    const { leadId } = useParams();
    const [actives, setActives] = useState([]);

    const teamQuery = useQuery({
        queryFn: () => API.getUserTeam(leadId),
        queryKey: ["team"],
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

    return (
        <>
            <div className="p-4 sm:ml-64">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                    {teamQuery.isSuccess && teamQuery.data ? (
                        <>
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                                        Your Team
                                        <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                                            Select your active players
                                        </p>
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
                                            <td className="px-6 py-4">{team?.["Top"]?.[0]?.name ?? "Empty"}</td>
                                            <td className="px-6 py-4">{team?.["Jungle"]?.[0]?.name ?? "Empty"}</td>
                                            <td className="px-6 py-4">{team?.["Mid"]?.[0]?.name ?? "Empty"}</td>
                                            <td className="px-6 py-4">{team?.["Bot"]?.[0]?.name ?? "Empty"}</td>
                                            <td className="px-6 py-4">{team?.["Sup"]?.[0]?.name ?? "Empty"}</td>
                                        </tr>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                            <td className="px-6 py-4">{team?.["Top"]?.[1]?.name ?? "Empty"}</td>
                                            <td className="px-6 py-4">{team?.["Jungle"]?.[1]?.name ?? "Empty"}</td>
                                            <td className="px-6 py-4">{team?.["Mid"]?.[1]?.name ?? "Empty"}</td>
                                            <td className="px-6 py-4">{team?.["Bot"]?.[1]?.name ?? "Empty"}</td>
                                            <td className="px-6 py-4">{team?.["Sup"]?.[1]?.name ?? "Empty"}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </>
                    ) : (
                        "NIENTE"
                    )}
                </div>
            </div>
        </>
    );
}
